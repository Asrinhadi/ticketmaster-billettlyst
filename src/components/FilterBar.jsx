import { useState } from 'react';
import { COUNTRIES } from '../constants/countryCodes';
import { CITIES } from '../constants/cityLocations';
import '../styles/FilterBar.scss';

export default function FilterBar({ onFilter, setLoading }) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (setLoading) setLoading(true);
    
    const formData = new FormData(e.target);
    
    // bygger et objekt med filterparams i stedet for querystreng
    const filterParams = {};
    
    if (formData.get('search')) {
      filterParams.keyword = formData.get('search');
    }
    
    if (formData.get('country')) {
      filterParams.countryCode = formData.get('country');
    }
    
    const cityData = formData.get('city');
    if (cityData) {
      filterParams.latlong = cityData;
      filterParams.radius = formData.get('radius') || '50';
      filterParams.unit = formData.get('unit') || 'km';
    }
    
    if (formData.get('date')) {
      const date = formData.get('date');
      filterParams.startDateTime = `${date}T00:00:00Z`;
    }
    
    console.log('sender filterParams', filterParams);
    onFilter(filterParams);
  }

  function handleReset(e) {
    e.target.form.reset();
    setSelectedCountry('');
    setSelectedCity('');
    if (setLoading) setLoading(true);
    onFilter({}); 
  }

  function handleCountryChange(e) {
    setSelectedCountry(e.target.value);
    setSelectedCity(''); 
  }

  const availableCities = CITIES.filter(city => city.code === selectedCountry);

  return (
    <form className="filter-bar" onSubmit={handleSubmit}>
      <label>
        Søk
        <input type="text" name="search" placeholder="Artist, event..." />
      </label>

    
      <label>
        Land
        <select
          name="country"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="">Velg land</option>
          {COUNTRIES.map(country => {
            // sjekk om landet har byer
            const hasCities = CITIES.some(c => c.code === country.code);
            if (!hasCities) return null;
            
            return (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            );
          })}
        </select>
      </label>

      <label>
        By
        <select
          name="city"
          disabled={!selectedCountry}
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {!selectedCountry ? (
            <option value="">Velg land først</option>
          ) : (
            <option value="">Velg by</option>
          )}
          
          {availableCities.map(city => (
            <option key={city.name} value={`${city.lat},${city.long}`}>
              {city.name}
            </option>
          ))}
        </select>
      </label>

     
      <label>
        Radius
        <input
          type="number"
          name="radius"
          min="1"
          defaultValue="50"
          disabled={!selectedCity}
        />
      </label>

      <label>
        Enhet
        <select name="unit" defaultValue="km" disabled={!selectedCity}>
          <option value="km">km</option>
          <option value="miles">miles</option>
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