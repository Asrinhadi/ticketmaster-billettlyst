import { useState } from 'react';
import { COUNTRIES } from '../constants/countryCodes';
import { CITIES } from '../constants/cityLocations';
import '../styles/FilterBar.scss';

export default function FilterBar({ onFilter, setLoading }) {
    const [selectedCountry, setSelectedCountry] = useState('');


    const filteredCities = CITIES.filter(city => city.code === selectedCountry);

    function handleSubmit(e) {
        e.preventDefault();
        setLoading?.(true);

        const formData = new FormData(e.target);
        let query = "";

        if (formData.get('search')) {
            query += "&keyword=" + formData.get('search');
        }
        if (formData.get('country')) {
            query += "&countryCode=" + formData.get('country');
        }
        if (formData.get('city')) {
            query += "&geoPoint=" + formData.get('city');
        }
        if (formData.get('date')) {
            query += "&startDateTime=" + formData.get('date') + "T00:00:00Z";
        }

        console.log("query", query);
        onFilter(query);
    }

    function handleReset(e) {
        e.target.form.reset(); 
        setSelectedCountry('');
        setLoading?.(true);
        onFilter("");
    }

    return (
        <form className="filter-bar" onSubmit={handleSubmit}>
            <label>
                Søk
                <input
                    type="text"
                    name="search"
                    placeholder="Artist, event..."
                />
            </label>

            <label>
                Land
                <select
                    name="country"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                >
                    <option value="">Velg land</option>
                    {COUNTRIES.map(c => (
                        <option key={c.code} value={c.code}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                By
                <select name="city" disabled={!selectedCountry}>
                    <option value="">
                        {selectedCountry ? "Velg by" : "Velg land først"}
                    </option>
                    {filteredCities.map(city => (
                        <option key={city.name} value={`${city.lat},${city.long}`}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Fra dato
                <input type="date" name="date" />
            </label>

            <div className="filter-buttons">
                <button type="submit">Filtrer</button>
                <button type="button" onClick={handleReset}>
                    Nullstill
                </button>
            </div>
        </form>
    );
}
