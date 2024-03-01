import { AddOns } from "./AddOns";
import { RoomType } from "./RoomType";
import { Date } from './Date'
import { Cost } from "./Cost";
import '../styling/RoomBooking.scss'

export function RoomBooking() {
  return (
    <div className="hotel-booking">
      <div>Hotel Booking</div>
      <RoomType/>
      <Date/>
      <AddOns/>
      <Cost/>
    </div>

  )
}
