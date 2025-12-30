import { useState } from 'react';
import '../styles/FilterBar.scss';

// Husk å flytte denne denne her til constants fil senere
const countries = [
    { code: '', name: 'Velg land' },
    { code: 'NO', name: 'Norge' },
    { code: 'SE', name: 'Sverige' },
    { code: 'DK', name: 'Danmark' },
    { code: 'US', name: 'USA' },
    { code: 'GB', name: 'Storbritannia' },
];

export default function FilterBar({ onFilter, setLoading }) {
    const [selectedCountry, setSelectedCountry] = useState('');

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
        if (formData.get('date')) {
            query += "&startDateTime=" + formData.get('date') + "T00:00:00Z";
        }
        
        console.log("queryen", query);
        onFilter(query);
    }

    function handleReset() {
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

            {/* landene dropdown */}
            <label>
                Land
                <select 
                    name="country"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                >
                    {countries.map(c => (
                        <option key={c.code} value={c.code}>
                            {c.name}
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