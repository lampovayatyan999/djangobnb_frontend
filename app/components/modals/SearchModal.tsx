'use client';   

import Modal from "./Modal"
import DatePicker from "../forms/Calendar";
import { Range } from "react-date-range";
import useSearchModal, { SearchQuery } from "@/app/hooks/useSearchModal"
import SelectCountry, {SelectCountryValue} from "../forms/SelectCountry";
import { useState } from "react";
import CustomButton from "../forms/CustomButton";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

const SearchModal = () => {
    let content = (<></>)
    const searchModal = useSearchModal();
    const [numGuests, setNumGuests] = useState<string>('1');
    const [numBedrooms, setNumBedrooms] = useState<string>('0');
    const [country, setCounrty] = useState<SelectCountryValue>();
    const [numBathrooms, setNumBathrooms] = useState<string>('0');
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    //
    //

    const closeAndSearch = () => {
        const newSearchQuery: SearchQuery = {
            country: country?.label,
            checkIn: dateRange.startDate,
            checkOut: dateRange.endDate,
            guests: parseInt(numGuests),
            bedrooms: parseInt(numBedrooms),
            bathrooms: parseInt(numBathrooms),
            category: ''
        }
        searchModal.setQuery(newSearchQuery);
        searchModal.close();
    }

    //
    // Set date range

    const _setDateRange = (selection: Range) => {
        if(searchModal.step === 'checkin'){
            searchModal.open('checkout');
        } else if (searchModal.step === 'checkout') {
            searchModal.open('details');
        }

        setDateRange(selection);
    }

    //
    // Contents

    const contentLocation = (
        <>
            <h2 className="mb-6 text-2xl">Where do you want to go?</h2>

            <SelectCountry
                value={country}
                onChange={(value) => setCounrty(value as SelectCountryValue)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    className="flex-1"
                    label="Check in date ->"
                    onClick={() => searchModal.open('checkin')}
                />
            </div>
        </>
    )

    const contentCheckin = (
        <>
            <h2 className="mb-6 text-2xl">When do you want to checkin in?</h2>

            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    className="flex-1"
                    label="<- Location"
                    onClick={() => searchModal.open('location')}
                />

                <CustomButton
                    className="flex-1"
                    label="Check out date ->"
                    onClick={() => searchModal.open('checkout')}
                />
            </div>
        </>
    )

    const contentCheckout = (
        <>
            <h2 className="mb-6 text-2xl">When do you want to checkin out?</h2>

            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4 ">
                <CustomButton
                    className="flex-1"
                    label="<- Check in date"
                    onClick={() => searchModal.open('checkin')}
                />

                <CustomButton
                    className="flex-1"
                    label="Detail ->"
                    onClick={() => searchModal.open('details')}
                />
            </div>
        </>
    )

    const contentDetails = (
        <>
            <h2 className="mb-6 text-2xl">Details</h2>

            <div className="space-y-4">
                <div className="space-y-4">
                    <label>Number of guests</label>
                    <input 
                        type="number"
                        min="1" 
                        value={numGuests} 
                        placeholder="Number of guests..."
                        onChange={(e) => setNumGuests(e.target.value)} 
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl " 
                    />
                </div>

                <div className="space-y-4">
                    <label>Number of bedrooms</label>
                    <input 
                        type="number"
                        min="1" 
                        value={numBedrooms} 
                        placeholder="Number of bedrooms..."
                        onChange={(e) => setNumBedrooms(e.target.value)} 
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl " 
                    />
                </div>

                <div className="space-y-4">
                    <label>Number of bathrooms</label>
                    <input 
                        type="number"
                        min="1" 
                        value={numBathrooms} 
                        placeholder="Number of bathrooms..."
                        onChange={(e) => setNumBathrooms(e.target.value)} 
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl " 
                    />
                </div>
            </div>

            <div className="mt-6 flex flex-row gap-4 ">
                <CustomButton
                    className="flex-1"
                    label="<- Check out date"
                    onClick={() => searchModal.open('checkout')}
                />

                <CustomButton
                    className="flex-1"
                    label="Search"
                    onClick={closeAndSearch}
                />
            </div>  
        </>
    )

    if (searchModal.step == 'location') {
        content = contentLocation;
    } else if (searchModal.step == 'checkin') {
        content = contentCheckin;
    } else if (searchModal.step == 'checkout') {
        content = contentCheckout;
    } else if (searchModal.step == 'details') {
        content = contentDetails;
    }

    return (
        <Modal 
            label="Search"
            content={content}
            close={searchModal.close}
            isOpen={searchModal.isOpen}
        />
    )
}

export default SearchModal;