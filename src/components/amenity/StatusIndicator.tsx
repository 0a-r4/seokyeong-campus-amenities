import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import amenitiesData from '../../data/amenities.json';

export interface OperatingHoursDay {
  open: string | boolean;
  close: string | boolean;
}

export interface OperatingHours {
  default?: OperatingHoursDay;
  saturday?: OperatingHoursDay;
  holiday?: OperatingHoursDay;
  sunday?: OperatingHoursDay;
  [key: string]: OperatingHoursDay | undefined;
}

export interface Amenity {
  id: string;
  name: string;
  categoryId: string;
  buildingId: string;
  floor: string;
  operatingHours?: OperatingHours;
}

export interface StatusIndicatorProps {
  amenityId?: string;
  operatingHours?: OperatingHours;
  currentDate?: Date;
}

export type OperatingStatus = 'OPEN' | 'CLOSING_SOON' | 'CLOSED' | 'UNKNOWN';

export interface StatusInfo {
  status: OperatingStatus;
  label: string;
  color: string;
  operatingHoursText?: string;
  remainingMinutes?: number;
}

export function getTodaySchedule(
  operatingHours?: OperatingHours,
  now: Date = new Date()
): OperatingHoursDay | null {
  if (!operatingHours) return null;
  const day = now.getDay();
  const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayKey = dayKeys[day];

  if (operatingHours[todayKey] !== undefined) {
    return operatingHours[todayKey] ?? null;
  }
  if (day === 0 && operatingHours.sunday !== undefined) {
    return operatingHours.sunday;
  }
  if (day === 6 && operatingHours.saturday !== undefined) {
    return operatingHours.saturday;
  }
  return operatingHours.default ?? null;
}

export function getOperatingStatus(
  operatingHours?: OperatingHours,
  now: Date = new Date()
): StatusInfo {
  const schedule = getTodaySchedule(operatingHours, now);
  if (!schedule) {
    return { status: 'UNKNOWN', label: '운영 정보 없음', color: '#6b7280' };
  }

  const { open, close } = schedule;
  if (open === false || close === false) {
    return { status: 'CLOSED', label: '운영 종료', color: '#dc2626' };
  }
  if (typeof open !== 'string' || typeof close !== 'string') {
    return { status: 'UNKNOWN', label: '운영 정보 없음', color: '#6b7280' };
  }

  const [openH, openM] = open.split(':').map((v) => parseInt(v, 10));
  const [closeH, closeM] = close.split(':').map((v) => parseInt(v, 10));

  if (Number.isNaN(openH) || Number.isNaN(openM) || Number.isNaN(closeH) || Number.isNaN(closeM)) {
    return { status: 'UNKNOWN', label: '운영 정보 없음', color: '#6b7280' };
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;
  const operatingHoursText = `${open} ~ ${close}`;

  if (openMinutes <= closeMinutes) {
    if (currentMinutes < openMinutes || currentMinutes >= closeMinutes) {
      return { status: 'CLOSED', label: '운영 종료', color: '#dc2626', operatingHoursText };
    }
    const diff = closeMinutes - currentMinutes;
    if (diff <= 60) {
      return {
        status: 'CLOSING_SOON',
        label: `마감 ${diff}분 전`,
        color: '#ea580c',
        operatingHoursText,
        remainingMinutes: diff,
      };
    }
    return { status: 'OPEN', label: '운영중', color: '#16a34a', operatingHoursText };
  }

  const isOperating = currentMinutes >= openMinutes || currentMinutes < closeMinutes;
  if (!isOperating) {
    return { status: 'CLOSED', label: '운영 종료', color: '#dc2626', operatingHoursText };
  }
  const diff = currentMinutes >= openMinutes ? 1440 - currentMinutes + closeMinutes : closeMinutes - currentMinutes;
  if (diff <= 60) {
    return {
      status: 'CLOSING_SOON',
      label: `마감 ${diff}분 전`,
      color: '#ea580c',
      operatingHoursText,
      remainingMinutes: diff,
    };
  }
  return { status: 'OPEN', label: '운영중', color: '#16a34a', operatingHoursText };
}

export default function StatusIndicator({
  amenityId,
  operatingHours,
  currentDate,
}: StatusIndicatorProps) {
  let routeAmenityId: string | undefined;
  try {
    const params = useParams<{ amenitiesId?: string }>();
    routeAmenityId = params.amenitiesId;
  } catch {
    routeAmenityId = undefined;
  }

  const [now, setNow] = useState<Date>(() => currentDate ?? new Date());

  useEffect(() => {
    if (currentDate) {
      setNow(currentDate);
      return;
    }
    const timer = setInterval(() => {
      setNow(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, [currentDate]);

  const targetId = amenityId ?? routeAmenityId;
  const amenities = amenitiesData as Amenity[];
  const targetAmenity = targetId
    ? amenities.find((item) => item.id.toLowerCase() === targetId.toLowerCase())
    : amenities[0];

  const resolvedOperatingHours = operatingHours ?? targetAmenity?.operatingHours;
  const statusInfo = getOperatingStatus(resolvedOperatingHours, now);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1rem',
        margin: '0.5rem 0',
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        fontSize: '14px',
      }}
    >
      <span
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: statusInfo.color,
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      <span style={{ fontWeight: 600, color: statusInfo.color }}>
        {statusInfo.label}
      </span>
      {statusInfo.operatingHoursText && (
        <span style={{ color: '#666', fontSize: '13px' }}>
          ({statusInfo.operatingHoursText})
        </span>
      )}
    </div>
  );
}

