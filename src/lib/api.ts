export interface CarTypeItem {
  id: string;
  name: string;
  min_fare?: string | number;
  base_fare?: string | number;
  image?: string;
  extra_info?: string;
}

export interface DriverSignupData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password?: string;
  carType: string;
  vehicleNumber: string;
  licenseNumber: string;
  operatingHub?: string;
}

export interface FleetAdminSignupData {
  companyName: string;
  contactPerson: string;
  firstName?: string;
  lastName?: string;
  email: string;
  mobile: string;
  password?: string;
  fleetSize: string | number;
  address?: string;
}

const RTDB_BASE_URL = 'https://hiilla-delivery-main-build-default-rtdb.europe-west1.firebasedatabase.app';
const API_BASE_URL = 'https://hiilla-delivery-main-build.web.app';

/**
 * Fetch available vehicle / bike categories configured in admin RTDB (/cartypes)
 */
export async function fetchCarTypes(): Promise<CarTypeItem[]> {
  try {
    const res = await fetch(`${RTDB_BASE_URL}/cartypes.json`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch vehicle categories');
    const data = await res.json();
    if (data && typeof data === 'object') {
      return Object.keys(data).map((key) => ({
        id: key,
        name: data[key].name || key.toUpperCase(),
        min_fare: data[key].min_fare || data[key].base_fare || '',
        base_fare: data[key].base_fare || '',
        image: data[key].image || '',
        extra_info: data[key].extra_info || '',
      }));
    }
  } catch (error) {
    console.warn('Error fetching cartypes from RTDB, falling back to defaults:', error);
  }

  // Fallback default vehicle types if network/database is not reachable
  return [
    { id: 'type1', name: 'BIKE', extra_info: 'Motorcycle / Dispatch Bike' },
    { id: 'type2', name: 'BICYCLE', extra_info: '2-Wheeler Bicycle' },
  ];
}

/**
 * Register a Driver / Rider (populates /users/1) or Fleet Admin (populates /users/2)
 */
export async function submitUserSignup(
  usertype: 'driver' | 'fleetadmin',
  formData: DriverSignupData | FleetAdminSignupData,
  recaptchaToken?: string
): Promise<{ success: boolean; uid?: string; error?: string }> {
  try {
    let formattedMobile = formData.mobile.trim();
    // Ensure international format for Nigerian numbers (+234)
    if (formattedMobile.startsWith('0')) {
      formattedMobile = '+234' + formattedMobile.slice(1);
    } else if (!formattedMobile.startsWith('+')) {
      formattedMobile = '+234' + formattedMobile;
    }

    // Prepare registration payload according to Cloud Functions valSignupData schema
    let regData: any = {
      email: formData.email.trim().toLowerCase(),
      mobile: formattedMobile,
      password: formData.password || 'Hiilla@' + Math.floor(1000 + Math.random() * 9000),
      usertype: usertype,
      approved: false, // Pending admin review
      walletBalance: 0,
      createdAt: Date.now(),
    };

    if (usertype === 'driver') {
      const driverData = formData as DriverSignupData;
      regData.firstName = driverData.firstName.trim();
      regData.lastName = driverData.lastName.trim();
      regData.carType = driverData.carType;
      regData.vehicleType = driverData.carType;
      regData.vehicleNumber = driverData.vehicleNumber.trim().toUpperCase();
      regData.licenseNumber = driverData.licenseNumber.trim().toUpperCase();
      regData.operatingHub = driverData.operatingHub || 'All Lagos Zones';
      regData.driverActiveStatus = false;
      regData.queue = false;
    } else if (usertype === 'fleetadmin') {
      const fleetData = formData as FleetAdminSignupData;
      const names = (fleetData.contactPerson || '').trim().split(' ');
      regData.firstName = fleetData.firstName || names[0] || 'Fleet';
      regData.lastName = fleetData.lastName || names.slice(1).join(' ') || 'Admin';
      regData.companyName = fleetData.companyName.trim();
      regData.contactPerson = fleetData.contactPerson.trim();
      regData.fleetSize = Number(fleetData.fleetSize) || 1;
      regData.address = fleetData.address ? fleetData.address.trim() : '';
    }

    const res = await fetch(`${API_BASE_URL}/user_signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        regData,
        recaptchaToken: recaptchaToken || undefined,
      }),
    });

    const result = await res.json();
    if (result.error) {
      let errorMsg = result.error;
      if (typeof errorMsg === 'object' && errorMsg.message) {
        errorMsg = errorMsg.message;
      }
      return { success: false, error: String(errorMsg) };
    }

    if (result.uid) {
      return { success: true, uid: result.uid };
    }

    return { success: false, error: 'Registration failed. Please check your information.' };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || 'Unable to connect to registration server. Please try again.',
    };
  }
}
