import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import buildingsData from '../../data/buildings.json';
import amenitiesData from '../../data/amenities.json';

interface Building {
  id: string;
  name: string;
}

interface OperatingHoursDay {
  open: string | boolean;
  close: string | boolean;
}

interface Amenity {
  id: string;
  name: string;
  categoryId: string;
  buildingId: string;
  floor: string;
  operatingHours?: {
    default?: OperatingHoursDay;
    saturday?: OperatingHoursDay;
    holiday?: OperatingHoursDay;
    sunday?: OperatingHoursDay;
    [key: string]: OperatingHoursDay | undefined;
  };
}

interface AmenityListProps {
  buildings?: Building[];
  amenities?: Amenity[];
  selectedCategory?: string;
  searchQuery?: string;
}

export default function AmenityList({
  buildings = buildingsData,
  amenities = amenitiesData,
  selectedCategory = 'all',
  searchQuery = '',
}: AmenityListProps) {
  const [openBuildings, setOpenBuildings] = useState<Record<string, boolean>>({});

  const toggleBuilding = (buildingId: string) => {
    setOpenBuildings((prev) => ({
      ...prev,
      [buildingId]: !prev[buildingId],
    }));
  };

  const trimmedQuery = searchQuery.trim().toLowerCase();

  const getBuildingAmenities = (buildingId: string) => {
    return amenities.filter((amenity) => {
      if (amenity.buildingId !== buildingId) return false;
      if (selectedCategory !== 'all' && amenity.categoryId !== selectedCategory) {
        return false;
      }
      if (trimmedQuery && !amenity.name.toLowerCase().includes(trimmedQuery)) {
        return false;
      }
      return true;
    });
  };

  const displayedBuildings = buildings.filter((building) => {
    const buildingAmenities = getBuildingAmenities(building.id);
    if (trimmedQuery || selectedCategory !== 'all') {
      return buildingAmenities.length > 0;
    }
    return true;
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        padding: '0rem 1rem 1rem 1rem',
      }}
    >
      {displayedBuildings.length === 0 ? (
        <p
          style={{
            textAlign: 'center',
            fontSize: '16px',
            color: '#888',
            padding: '2.5rem 0',
            margin: 0,
          }}
        >
          일치하는 편의시설이 없습니다.
        </p>
      ) : (
        displayedBuildings.map((building) => {
          const isOpen = !!openBuildings[building.id];
          const buildingAmenities = getBuildingAmenities(building.id);

          return (
            <div
              key={building.id}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                backgroundColor: '#fff',
                overflow: 'hidden',
              }}
            >
              <button
                type="button"
                onClick={() => toggleBuilding(building.id)}
                aria-expanded={isOpen}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  border: 'none',
                  backgroundColor: '#f9f9f9',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#333',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{building.name}</span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 400,
                      color: '#666',
                    }}
                  >
                    ({buildingAmenities.length})
                  </span>
                </div>
                {isOpen ? (
                  <MdExpandLess size="1.2rem" color="#666" />
                ) : (
                  <MdExpandMore size="1.2rem" color="#666" />
                )}
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: '0.5rem 1rem',
                    borderTop: '1px solid #eee',
                  }}
                >
                  {buildingAmenities.length > 0 ? (
                    <ul
                      style={{
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {buildingAmenities.map((amenity) => (
                        <li
                          key={amenity.id}
                          style={{
                            borderBottom:
                              buildingAmenities.length === 1
                                ? 'none'
                                : '1px solid #f0f0f0',
                            fontSize: '13px',
                          }}
                        >
                          <Link
                            to={`/${amenity.id}`}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '0.5rem 0',
                              textDecoration: 'none',
                              color: 'inherit',
                            }}
                          >
                            <span style={{ color: '#333' }}>{amenity.name}</span>
                            <span style={{ color: '#888', fontSize: '12px' }}>
                              {amenity.floor}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p
                      style={{
                        margin: '0.5rem 0',
                        fontSize: '13px',
                        color: '#888',
                        textAlign: 'center',
                      }}
                    >
                      등록된 편의시설이 없습니다.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
