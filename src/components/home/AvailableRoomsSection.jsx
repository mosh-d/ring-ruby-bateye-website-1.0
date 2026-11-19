import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { Reveal, RevealGroup, RevealItem, Words } from "../shared/guestMotion";
import DatePicker from "../shared/DatePicker";
import Button from "../shared/Button";
import GalleryModal from "../shared/GalleryModal";
import { localTodayISO } from "../../utils/date-utils";

//React icons
import { LiaShowerSolid, LiaToiletPaperSolid } from "react-icons/lia";
import { FaChild } from "react-icons/fa6";
import { IoIosMan } from "react-icons/io";
import {
  MdDesk,
  MdOutlineCoffeeMaker,
  MdOutlineEmojiFoodBeverage,
  MdOutlineLiving,
  MdOutlineLuggage,
  MdOutlineMicrowave,
  MdOutlineTableBar,
} from "react-icons/md";
import { RxRulerSquare } from "react-icons/rx";
import { BiDish } from "react-icons/bi";
import {
  IoWifiOutline,
  IoBedOutline,
  IoCardOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { FaTv } from "react-icons/fa";
import { LuArmchair, LuBath, LuFan, LuPhone, LuSofa } from "react-icons/lu";
import { TbAirConditioning, TbFridge, TbToolsKitchen2 } from "react-icons/tb";
import { PiBathtub, PiHairDryer } from "react-icons/pi";
import { GiRobe, GiSlippers } from "react-icons/gi";

//Room images
import executiveDeluxeRoomImage from "../../assets/room-images/executive-deluxe/executive-deluxe.jpg";
import executiveDeluxeRoomImage2 from "../../assets/room-images/executive-deluxe/executive-deluxe-2.jpg";
import executiveDeluxeRoomImage3 from "../../assets/room-images/executive-deluxe/executive-deluxe-3.jpg";
import executiveDeluxeRoomImage4 from "../../assets/room-images/executive-deluxe/executive-deluxe-4.jpg";
import standardRoomImage from "../../assets/room-images/standard/standard.jpg";
import standardRoomImage2 from "../../assets/room-images/standard/standard-2.jpg";
import standardRoomImage3 from "../../assets/room-images/standard/standard-3.jpg";
import standardRoomImage4 from "../../assets/room-images/standard/standard-4.jpg";
import executiveSuiteRoomImage from "../../assets/room-images/executive-suite/executive-suite.jpg";
import executiveSuiteRoomImage2 from "../../assets/room-images/executive-suite/executive-suite-2.jpg";
import executiveSuiteRoomImage3 from "../../assets/room-images/executive-suite/executive-suite-3.jpg";
import executiveSuiteRoomImage4 from "../../assets/room-images/executive-suite/executive-suite-4.jpg";

// Mobile room images
import mobileExecutiveDeluxeImage from "../../assets/mobile-room-images/executive-deluxe/executive-deluxe.jpg";
import mobileExecutiveDeluxeImage2 from "../../assets/mobile-room-images/executive-deluxe/executive-deluxe-2.jpg";
import mobileExecutiveDeluxeImage3 from "../../assets/mobile-room-images/executive-deluxe/executive-deluxe-3.jpg";
import mobileExecutiveDeluxeImage4 from "../../assets/mobile-room-images/executive-deluxe/executive-deluxe-4.jpg";
import mobileStandardImage from "../../assets/mobile-room-images/standard/standard.jpg";
import mobileStandardImage2 from "../../assets/mobile-room-images/standard/standard-2.jpg";
import mobileStandardImage3 from "../../assets/mobile-room-images/standard/standard-3.jpg";
import mobileStandardImage4 from "../../assets/mobile-room-images/standard/standard-4.jpg";
import mobileExecutiveSuiteImage from "../../assets/mobile-room-images/executive-suite/executive-suite.jpg";
import mobileExecutiveSuiteImage2 from "../../assets/mobile-room-images/executive-suite/executive-suite-2.jpg";
import mobileExecutiveSuiteImage3 from "../../assets/mobile-room-images/executive-suite/executive-suite-3.jpg";
import mobileExecutiveSuiteImage4 from "../../assets/mobile-room-images/executive-suite/executive-suite-4.jpg";

// standard room images
const standardRoomImages = [
  standardRoomImage,
  standardRoomImage2,
  standardRoomImage3,
  standardRoomImage4,
];

// executive deluxe room images
const executiveDeluxeRoomImages = [
  executiveDeluxeRoomImage,
  executiveDeluxeRoomImage2,
  executiveDeluxeRoomImage3,
  executiveDeluxeRoomImage4,
];

// executive suite room images
const executiveSuiteRoomImages = [
  executiveSuiteRoomImage,
  executiveSuiteRoomImage2,
  executiveSuiteRoomImage3,
  executiveSuiteRoomImage4,
];

// Mobile standard room images
const mobileStandardImages = [
  mobileStandardImage,
  mobileStandardImage2,
  mobileStandardImage3,
  mobileStandardImage4,
];

// Mobile executive deluxe room images
const mobileExecutiveDeluxeImages = [
  mobileExecutiveDeluxeImage,
  mobileExecutiveDeluxeImage2,
  mobileExecutiveDeluxeImage3,
  mobileExecutiveDeluxeImage4,
];

// Mobile executive suite room images
const mobileExecutiveSuiteImages = [
  mobileExecutiveSuiteImage,
  mobileExecutiveSuiteImage2,
  mobileExecutiveSuiteImage3,
  mobileExecutiveSuiteImage4,
];

const useSharedContext = () => {
  const context = useOutletContext();
  if (!context) {
    console.error("No context available in AvailableRoomsSection");
    throw new Error(
      "Component must be used within a layout providing shared context",
    );
  }
  return context;
};

const amenityIcons = {
  free_wifi: <IoWifiOutline size="2.5rem" />,
  ac: <TbAirConditioning size="2.5rem" />,
  shower: <LiaShowerSolid size="2.5rem" />,
  workstation: <MdDesk size="2.5rem" />,
  breakfast: <BiDish size="2.5rem" />,
  private_bathroom: <LuBath size="2.5rem" />,
  toiletries: <LiaToiletPaperSolid size="2.5rem" />,
  king_size_bed: <IoBedOutline size="2.5rem" />,
  smart_tv: <FaTv size="2.5rem" />,
  coffee_station: <MdOutlineCoffeeMaker size="2.5rem" />,
  fridge: <TbFridge size="2.5rem" />,
  balcony: <RxRulerSquare size="2.5rem" />,
  coffee_maker: <MdOutlineCoffeeMaker size="2.5rem" />,
  electric_key: <IoCardOutline size="2.5rem" />,
  complimentary_drinks: <MdOutlineEmojiFoodBeverage size="2.5rem" />,
  // Every other amenity name the branches' room types use (2026-09-21, read
  // from each branch's rooms), so none shows as bare text.
  telephone: <LuPhone size="2.5rem" />,
  refrigerator: <TbFridge size="2.5rem" />,
  regfigerator: <TbFridge size="2.5rem" />, // a room type's own spelling of refrigerator
  microwaves: <MdOutlineMicrowave size="2.5rem" />,
  private_kitchen: <TbToolsKitchen2 size="2.5rem" />,
  complimentary_beverage_and_water: <MdOutlineEmojiFoodBeverage size="2.5rem" />,
  bed: <IoBedOutline size="2.5rem" />,
  queen_size_bed: <IoBedOutline size="2.5rem" />,
  medium_size_bed: <IoBedOutline size="2.5rem" />,
  bathtub: <PiBathtub size="2.5rem" />,
  bathrobes: <GiRobe size="2.5rem" />,
  bathroom_slippers: <GiSlippers size="2.5rem" />,
  hair_dryer: <PiHairDryer size="2.5rem" />,
  centre_table: <MdOutlineTableBar size="2.5rem" />,
  double_sofa: <LuSofa size="2.5rem" />,
  lounge: <LuArmchair size="2.5rem" />,
  sitting_room: <MdOutlineLiving size="2.5rem" />,
  luggage_racks: <MdOutlineLuggage size="2.5rem" />,
  fan: <LuFan size="2.5rem" />,
  flat_screen_tv: <FaTv size="2.5rem" />,
  electronic_card_key_lock: <IoCardOutline size="2.5rem" />,
  work_station: <MdDesk size="2.5rem" />,
  room_size: <RxRulerSquare size="2.5rem" />,
};

// Names match case-insensitively (a room type saved with "Smart_tV" still
// finds smart_tv), and a room size - stored with its figure, e.g.
// room_size(13.1sqm) - matches on its prefix.
const amenityIcon = (amenity) => {
  const key = amenity.trim().toLowerCase();
  return amenityIcons[key.startsWith("room_size") ? "room_size" : key] || null;
};

const getAmenityDisplayName = (amenity) => {
  return amenity
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// A night's price is the room, plus breakfast when the guest wants it (owner,
// 2026-11-19: room and breakfast prices shown apart, with a tick for
// breakfast that starts ticked). A room type with no breakfast price shows
// the room price alone and no tick. The choice goes with the booking as
// without_breakfast, which the server prices and the PMS shows.
const breakfastRate = (room) => Number(room?.breakfast_rate || 0);
const nightlyRate = (room, withBreakfast = true) =>
  Number(room?.base_rate || 0) + (withBreakfast ? breakfastRate(room) : 0);

// One room type's price: the room, the breakfast tick (when it has a
// breakfast price), and the total for the rooms chosen.
function RoomPrice({ room, rooms, withBreakfast, onBreakfastChange, mobile = false }) {
  const symbol = room.currency_symbol || "₦";
  const breakfast = breakfastRate(room);
  const perNight = nightlyRate(room, withBreakfast);
  const big = mobile ? "text-2xl" : "text-3xl font-bold";
  const id = `breakfast-${mobile ? "mobile" : "desktop"}-${room.room_type_id}`;
  return (
    <div className={`flex flex-col ${mobile ? "gap-3" : "gap-6"}`}>
      {breakfast > 0 ? (
        <>
          <div className="flex flex-col gap-3 text-xl">
            <span>
              Room: {symbol}
              {Number(room.base_rate || 0).toLocaleString()} per night
            </span>
            <label htmlFor={id} className="flex items-center gap-3 cursor-pointer select-none">
              <input
                id={id}
                type="checkbox"
                checked={withBreakfast}
                onChange={(e) => onBreakfastChange(e.target.checked)}
                className="w-6 h-6 shrink-0 cursor-pointer accent-[color:var(--emphasis)]"
              />
              <span>
                Breakfast: {symbol}
                {breakfast.toLocaleString()} per night
              </span>
            </label>
          </div>
          <span className={big}>
            {symbol}
            {perNight.toLocaleString()} per night{withBreakfast ? " with breakfast" : ", room only"}
          </span>
        </>
      ) : (
        <span className={big}>
          {symbol}
          {perNight.toLocaleString()} per night
        </span>
      )}
      {rooms > 1 &&
        (mobile ? (
          <div className="text-2xl font-bold text-[color:var(--emphasis)]">
            {symbol}
            {(perNight * rooms).toLocaleString()} total for {rooms} rooms
          </div>
        ) : (
          <>
            <hr />
            <span className="text-3xl font-bold text-[color:var(--emphasis)]">
              {symbol}
              {(perNight * rooms).toLocaleString()} total
            </span>
          </>
        ))}
    </div>
  );
}

export default function AvailableRoomsSection() {
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState({});
  // Room types the guest unticked breakfast on (ticked is the default).
  const [noBreakfast, setNoBreakfast] = useState({});
  const wantsBreakfast = (room) => !noBreakfast[room.room_type_id];
  const setBreakfast = (room, on) => setNoBreakfast((prev) => ({ ...prev, [room.room_type_id]: !on }));
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentGalleryImages, setCurrentGalleryImages] = useState([]);

  const today = localTodayISO();

  const desktopRoomGalleryImages = {
    Standard: standardRoomImages,
    ExecutiveDeluxe: executiveDeluxeRoomImages,
    ExecutiveSuite: executiveSuiteRoomImages,
    "Executive Deluxe": executiveDeluxeRoomImages,
    "Executive Suite": executiveSuiteRoomImages,
  };

  const desktopRoomTypeImages = {
    Standard: standardRoomImage,
    ExecutiveDeluxe: executiveDeluxeRoomImage,
    ExecutiveSuite: executiveSuiteRoomImage,
    "Executive Deluxe": executiveDeluxeRoomImage,
    "Executive Suite": executiveSuiteRoomImage,
  };

  // Mobile mappings aren't read anywhere below (mobile view reuses the
  // desktop images), kept only so the imported mobile assets above have a
  // reference and don't need separate per-import lint suppression.
  // eslint-disable-next-line no-unused-vars -- parked, not dead: the mobile image set was switched off on purpose and is kept for turning back on
  const mobileRoomGalleryImages = {
    Standard: mobileStandardImages,
    ExecutiveDeluxe: mobileExecutiveDeluxeImages,
    ExecutiveSuite: mobileExecutiveSuiteImages,
    "Executive Deluxe": mobileExecutiveDeluxeImages,
    "Executive Suite": mobileExecutiveSuiteImages,
  };

  // eslint-disable-next-line no-unused-vars -- parked, not dead: the mobile image set was switched off on purpose and is kept for turning back on
  const mobileRoomTypeImages = {
    Standard: mobileStandardImage,
    ExecutiveDeluxe: mobileExecutiveDeluxeImage,
    ExecutiveSuite: mobileExecutiveSuiteImage,
    "Executive Deluxe": mobileExecutiveDeluxeImage,
    "Executive Suite": mobileExecutiveSuiteImage,
  };

  const roomGalleryImages = desktopRoomGalleryImages;
  const roomPrimaryImages = desktopRoomTypeImages;

  const handleViewImages = (images) => {
    if (!images || images.length === 0) return;

    const formattedImages = images
      .filter((img) => img !== undefined)
      .map((img, index) => ({
        src: img,
        alt: `Room Image ${index + 1}`,
      }));
    setCurrentGalleryImages(formattedImages);
    setIsGalleryOpen(true);
  };

  const {
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    setNumberOfRooms,
    setRoomType,
    setWithBreakfast,
    updateTotalPayment,
    roomTypes,
    isLoadingRooms,
  } = useSharedContext();

  const minCheckOutDate = useMemo(() => {
    if (!checkInDate) return today;
    const d = new Date(checkInDate + "T00:00:00");
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, [checkInDate, today]);

  const handleRoomsChange = (roomTypeId, value) => {
    setSelectedRooms((prev) => ({
      ...prev,
      [roomTypeId]: value,
    }));
  };

  const handleBookRoom = (room) => {
    const selectedRoomCount = parseInt(selectedRooms[room.room_type_id] || "0");
    if (selectedRoomCount <= 0) return; // Don't proceed if no rooms selected

    const withBreakfast = breakfastRate(room) > 0 && wantsBreakfast(room);
    setRoomType(room.room_type_name);
    setNumberOfRooms(selectedRoomCount.toString());
    setWithBreakfast(withBreakfast);
    updateTotalPayment(
      room.room_type_name,
      selectedRoomCount, // Just pass the number of rooms, not the total price
      withBreakfast,
    );
    // Scroll to top before navigating
    window.scrollTo(0, 0);
    navigate("/booking-confirmation");
  };

  const renderAmenities = (amenities) => {
    if (!amenities) return null;

    return amenities.split(", ").map((amenity, index) => {
      const icon = amenityIcon(amenity);
      return (
        <div
          key={index}
          className="flex items-center gap-2 p-[.5rem] text-white"
          title={getAmenityDisplayName(amenity)}
        >
          {icon && <span className="text-white">{icon}</span>}
          <span className="text-lg text-white">
            {getAmenityDisplayName(amenity)}
          </span>
        </div>
      );
    });
  };

  const renderCapacityIcons = (adults, children) => {
    return (
      <div className="flex flex-col max-sm:flex-row items-center max-sm:items-end gap-4">
        <div className="flex items-start">
          <IoIosMan size="4rem" title="Adults" />
          <span className="text-2xl">{adults}</span>
        </div>
        {children > 0 && (
          <div className="flex items-start">
            <FaChild size="2.5rem" title="Children" />
            <span className="text-2xl">{children}</span>
          </div>
        )}
      </div>
    );
  };

  if (isLoadingRooms && roomTypes.length === 0) {
    return <div className="p-12 text-center">Loading room information...</div>;
  }

  return (
    <div
      id="available-rooms"
      className="py-[12rem] max-sm:py-[0] px-[2rem] lg:px-[12rem] w-full flex flex-col gap-[4.8rem]"
    >
      <div className="flex max-sm:flex-col max-sm:gap-[2.4rem] justify-between items-center max-sm:items-start">
        <Words text="Available Rooms" className="text-6xl font-secondary font-bold" />
      </div>

      <Reveal delay={0.15} className="flex w-full max-sm:flex-col max-sm:gap-[2.4rem] gap-[6rem] justify-between">
        {/* Two real columns, not a row sized to its content: in a content-
            sized row each picker collapsed to its narrowest width, and
            "Select check-out" broke at its hyphen (2026-09-19). */}
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-[4.8rem] max-sm:gap-[2.4rem] w-full max-w-[64rem]">
          <DatePicker
            label="Check in"
            value={checkInDate}
            onChange={setCheckInDate}
            minDate={today}
            placeholder="Select check-in"
          />
          <DatePicker
            label="Check out"
            value={checkOutDate}
            onChange={setCheckOutDate}
            minDate={minCheckOutDate}
            placeholder="Select check-out"
          />
        </div>
      </Reveal>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead className="text-white bg-[color:var(--text-color)]">
            <tr>
              <th className="text-xl font-bold p-4 text-left">Room type</th>
              <th className="text-xl font-bold p-4 text-left">Room capacity</th>
              <th className="text-xl font-bold p-4 text-left">
                Number of Rooms
              </th>
              <th className="text-xl font-bold p-4 text-left">Today's Price</th>
              <th className="text-xl font-bold p-4 text-left">Action</th>
            </tr>
          </thead>
          <RevealGroup as="tbody" stagger={0.12} className="text-[color:var(--light-gray)]">
            {roomTypes.map((room) => (
              <RevealItem as="tr" y={32} key={`desktop-${room.room_type_id}`}>
                <td
                  className="flex flex-col p-4 border-[color:var(--background-color)] border-1 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, hsla(359, 50%, 7%, .85), hsla(359, 50%, 7%, .85)), url(${
                      roomPrimaryImages[room.room_type_name] ||
                      standardRoomImage
                    })`,
                    // backgroundBlendMode: 'multiply'
                  }}
                >
                  <div className="relative z-10 gap-[4rem] flex flex-col py-[2rem]">
                    <div className="flex justify-between">
                      <h4 className="text-5xl font-secondary font-bold text-white">
                        {room.room_type_name}
                      </h4>
                      <button
                        className="text-[color:var(--emphasis)] text-xl cursor-pointer border-b py-[.5rem]"
                        onClick={() =>
                          handleViewImages(
                            roomGalleryImages[room.room_type_name],
                          )
                        }
                      >
                        View Images
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {renderAmenities(room.amenities)}
                    </div>
                  </div>
                </td>
                <td className="p-4 border border-[color:var(--text-color)]/20">
                  {renderCapacityIcons(
                    room.adult_capacity,
                    room.child_capacity,
                  )}
                </td>
                <td className="p-4 border border-[color:var(--text-color)]/20">
                  <select
                    value={selectedRooms[room.room_type_id] || "0"}
                    onChange={(e) =>
                      handleRoomsChange(room.room_type_id, e.target.value)
                    }
                    className="w-full p-2 border rounded focus:outline-none hover:cursor-pointer text-xl"
                    disabled={isLoadingRooms || !room.total_rooms}
                  >
                    <option value="0" className="text-xl">
                      {room.total_rooms === 0 ? "Unavailable" : "0"}
                    </option>
                    {Array.from({ length: room.total_rooms || 0 }, (_, i) => (
                      <option
                        key={i + 1}
                        value={i + 1}
                        className="text-xl hover:cursor-pointer"
                      >
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-4 border border-[color:var(--text-color)]/20">
                  <RoomPrice
                    room={room}
                    rooms={parseInt(selectedRooms[room.room_type_id] || "1")}
                    withBreakfast={wantsBreakfast(room)}
                    onBreakfastChange={(on) => setBreakfast(room, on)}
                  />
                </td>
                <td className="p-4 border border-[color:var(--text-color)]/20">
                  <Button
                    variant="emphasis"
                    onClick={() => handleBookRoom(room)}
                    className="w-full text-xl"
                    disabled={
                      isLoadingRooms ||
                      !parseInt(selectedRooms[room.room_type_id] || "0")
                    }
                  >
                    {parseInt(selectedRooms[room.room_type_id] || "0")
                      ? "Book"
                      : "Select rooms first"}
                  </Button>
                </td>
              </RevealItem>
            ))}
          </RevealGroup>
        </table>
      </div>

      {/* Mobile Card View */}
      <RevealGroup stagger={0.1} className="md:hidden space-y-6">
        {roomTypes.map((room) => (
          <RevealItem y={32}
            key={`mobile-${room.room_type_id}`}
            className="bg-cover bg-center relative text-[color:var(--white)] border border-[color:var(--white)] rounded-lg overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(to bottom, hsla(359, 50%, 7%, .9), hsla(359, 50%, 7%, .9)), url(${
                roomPrimaryImages[room.room_type_name] || standardRoomImage
              })`,
            }}
          >
            {/* Room Type Header */}
            <div className="p-4">
              <div className="relative z-10">
                <div className="flex justify-between">
                  <h4 className="text-4xl font-secondary font-bold">
                    {room.room_type_name}
                  </h4>
                  <button
                    className="text-[color:var(--emphasis)] text-xl cursor-pointer border-b py-[.5rem]"
                    onClick={() =>
                      handleViewImages(roomGalleryImages[room.room_type_name])
                    }
                  >
                    View Images
                  </button>
                </div>
              </div>
            </div>

            {/* Room Content */}
            <div className="p-4 space-y-4 flex flex-col gap-4">
              {/* Amenities */}
              <div className="border border-[color:var(--white)]/20 p-[1rem]">
                <h5 className="text-xl font-semibold mb-2">Amenities</h5>
                <div className="grid grid-cols-2 gap-2">
                  {renderAmenities(room.amenities)}
                </div>
              </div>

              {/* Capacity */}
              <div className="border border-[color:var(--white)]/20 p-[1rem]">
                <h5 className="text-xl font-semibold mb-2">Capacity</h5>
                <div className="flex items-center gap-4">
                  {renderCapacityIcons(
                    room.adult_capacity,
                    room.child_capacity,
                  )}
                </div>
              </div>

              {/* Number of Rooms */}
              <div className="border border-[color:var(--white)]/20 p-[1rem]">
                <h5 className="text-xl font-semibold mb-2">Number of Rooms</h5>
                <select
                  value={selectedRooms[room.room_type_id] || "0"}
                  onChange={(e) =>
                    handleRoomsChange(room.room_type_id, e.target.value)
                  }
                  className="w-full p-2 border rounded focus:outline-none cursor-pointer text-lg text-white"
                  disabled={isLoadingRooms || !room.total_rooms}
                >
                  <option
                    value="0"
                    className="text-lg cursor-pointer text-[color:var(--text-color)]"
                  >
                    {room.total_rooms === 0
                      ? "Unavailable"
                      : "0 (Select rooms)"}
                  </option>
                  {Array.from({ length: room.total_rooms || 0 }, (_, i) => (
                    <option
                      key={i + 1}
                      value={i + 1}
                      className="text-lg cursor-pointer text-[color:var(--text-color)]"
                    >
                      {i + 1} Room{i !== 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="border border-[color:var(--white)]/20 p-[1rem]">
                <h5 className="text-xl font-semibold mb-2">Price</h5>
                <RoomPrice
                  mobile
                  room={room}
                  rooms={parseInt(selectedRooms[room.room_type_id] || "1")}
                  withBreakfast={wantsBreakfast(room)}
                  onBreakfastChange={(on) => setBreakfast(room, on)}
                />
              </div>

              {/* Book Button */}
              <div className="pt-2">
                <Button
                  variant="emphasis"
                  onClick={() => handleBookRoom(room)}
                  className="w-full text-lg py-3"
                  disabled={
                    isLoadingRooms ||
                    !parseInt(selectedRooms[room.room_type_id] || "0")
                  }
                >
                  {parseInt(selectedRooms[room.room_type_id] || "0")
                    ? "Book Now"
                    : "Select rooms first"}
                </Button>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={currentGalleryImages}
        currentImageIndex={0}
      />
    </div>
  );
}
