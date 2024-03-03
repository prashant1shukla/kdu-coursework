import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddOns {
  name: string;
  cost: string;
  currency: string;
}

interface RoomTypes {
  id: number;
  name: string;
  costPerNight: string;
  currency: string;
  addOns: AddOns[];
}

interface roomList {
  roomTypes: RoomTypes[];
}

const list: roomList={
  roomTypes:[{"id":1,"name":"Single Room","costPerNight":"5000","currency":"INR","addOns":[{"name":"Breakfast","cost":"300","currency":"INR"},{"name":"Extra Bed","cost":"2000","currency":"INR"}]},{"id":2,"name":"Twin Room","costPerNight":"7000","currency":"INR","addOns":[{"name":"Breakfast","cost":"300","currency":"INR"},{"name":"Balcony Unit","cost":"2000","currency":"INR"}]},{"id":3,"name":"Deluxe","costPerNight":"10000","currency":"INR","addOns":[{"name":"Breakfast","cost":"300","currency":"INR"},{"name":"Balcony Unit","cost":"2000","currency":"INR"},{"name":"Sea Facing","cost":"3000","currency":"INR"}]},{"id":4,"name":"Presidential Suite","costPerNight":"12000","currency":"INR","addOns":[{"name":"Breakfast","cost":"300","currency":"INR"},{"name":"Pent House Unit","cost":"8000","currency":"INR"},{"name":"Limousine Service","cost":"15000","currency":"INR"}]}]
};

interface cost{
  roomName:string,
  roomCost: number,
  numberOfDays: number,
  addOnsPrices:number[];
  total:number
}

const initialState: cost={
  roomName:'',
  roomCost:0,
  numberOfDays: 0,
  addOnsPrices:[],
  total:0
}

const roomSlice = createSlice({
    name: "room",
    initialState: initialState,
    reducers: {
      addRoomType: (state, action: PayloadAction<string>)=>{
        const element=list.roomTypes.find((room1)=>room1.name===action.payload)
        state.roomCost=Number(element?.costPerNight);
        state.roomName=String(element?.name);
      },
      addNumberOfDays: (state, action: PayloadAction<string>)=>{
        state.numberOfDays= Number(action.payload);
      },
      addAddOns: (state, action: PayloadAction<string>)=>{
        const addOn=action.payload;
        const element=list.roomTypes.find((room1)=>room1.name===state.roomName);
        const price=Number(list.roomTypes.find((room1)=>room1.name===element?.name)?.addOns.find((item)=>item.name===addOn)?.cost);
        state.addOnsPrices.push(price);
      },
      finalCost: (state)=>{
        let addOnPrice=0;
        state.addOnsPrices.forEach((item)=>addOnPrice+=item);
        state.total=(state.roomCost*state.numberOfDays)+addOnPrice;
      }

    }
})
export const { addRoomType, addNumberOfDays, addAddOns, finalCost} = roomSlice.actions;

export default roomSlice.reducer;
