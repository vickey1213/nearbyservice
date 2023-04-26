import React, { useState, useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../App.css";

function BusinessList({ businesses }) {
  return (
    <div className="business-list">
      <TransitionGroup>
        {businesses.map((business) => (
          <CSSTransition key={business.name} timeout={500} classNames="fade">
            <div className="business-card">
              <h3>{business.name}</h3>
              <p>
                <strong>Category:</strong> {business.category}
              </p>
              <p>
                <strong>Location:</strong> {business.location}
              </p>
              <p>
                <strong>Reviews:</strong> {business.reviews}
              </p>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

const Businesses = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [businesses, setBusinesses] = useState([
    {
      name: "Bruger King",
      category: "Restaurants",
      location: "Whitefield",
      reviews: 4.5,
    },
    {
      name: "Auto Repair",
      category: "Auto Services",
      location: "Ashraya layout",
      reviews: 3.8,
    },
    {
      name: "Cleaning Service",
      category: "Home Services",
      location: "Whitefield",
      reviews: 4.9,
    },
    {
      name: "Karachi Bakery",
      category: "Restaurants",
      location: "Phenix",
      reviews: 4.2,
    },
    {
      name: "Landscaping",
      category: "Home Services",
      location: "Marathalli",
      reviews: 3.6,
    },
    {
      name: "Car Wash",
      category: "Auto Services",
      location: "Marathalli",
      reviews: 4.1,
    },
  ]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredBusinesses = useMemo(() => {
    if (selectedCategory === "") {
      return businesses;
    } else {
      return businesses.filter(
        (business) => business.category === selectedCategory
      );
    }
  }, [businesses, selectedCategory]);

  const sortedBusinesses = useMemo(() => {
    const sorted = [...filteredBusinesses].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.reviews - b.reviews;
      } else {
        return b.reviews - a.reviews;
      }
    });
    return sorted;
  }, [filteredBusinesses, sortOrder]);

  return (
    <div className="container">
      <div className="filters">
        <label htmlFor="category-filter">Category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          <option value="Restaurants">Restaurants</option>
          <option value="Auto Services">Auto Services</option>
          <option value="Home Services">Home Services</option>
        </select>
        <label htmlFor="sort-filter">Sort by:</label>
        <select id="sort-filter" value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>
      <BusinessList businesses={sortedBusinesses} />
    </div>
  );
};

export default Businesses;
