export const COURSE_LIST = [
    "Appetizer",
    "Breakfast",
    "Brunch",
    "Dessert",
    "Dinner",
    "Lunch",
    "Main Course",
    "One Pot Dish",
    "Side Dish",
    "Snack",
];

export const DIET_LIST = [
    "Vegetarian",
    "High Protein Vegetarian",
    "Non Vegeterian",
    "No Onion No Garlic (Sattvic)",
    "High Protein Non Vegetarian",
    "Diabetic Friendly",
    "Eggetarian",
    "Vegan",
    "Gluten Free",
    "Sugar Free Diet",
];

export const CUISINE_LIST = [
    "Hyderabadi",
    "Chettinad",
    "Mediterranean",
    "Thai",
    "Asian",
    "Udupi",
    "Mughlai",
    "Andhra",
    "Fusion",
    "Mangalorean",
    "Bengali",
    "French",
    "African",
    "Himachal",
    "Tamil Nadu",
    "Middle Eastern",
    "Gujarati",
    "Punjabi",
    "Konkan",
    "European",
    "Malvani",
    "Maharashtrian",
    "Indo Chinese",
    "Rajasthani",
    "Japanese",
    "Oriya",
    "Kashmiri",
    "Assamese",
    "Sindhi",
    "American",
    "Uttarakhand-North Kumaon",
    "Sri Lankan",
    "Uttar Pradesh",
    "Bihari",
    "Vietnamese",
    "Awadhi",
    "Haryana",
    "Indonesian",
    "Korean",
    "South Karnataka",
    "Malabar",
    "Burmese",
    "Parsi Recipes",
    "Nepalese",
    "Hunan",
    "Afghan",
    "Greek",
    "Arab",
    "Caribbean",
    "Jharkhand",
    "Lucknowi",
    "British",
    "Jewish",
    "Pakistani",
    "Kongunadu",
    "Malaysian",
    "Nagaland",
    "Bangladeshi",
    "Sichuan",
    "Singapore",
    "Swedish",
];

export const INITIAL_COURSES_CHECKED = COURSE_LIST.reduce((result, item) => {
    result[item] = false;
    return result;
}, {});

export const INITIAL_DIETS_CHECKED = DIET_LIST.reduce((result, item) => {
    result[item] = false;
    return result;
}, {});

export const INITIAL_CUISINES_CHECKED = CUISINE_LIST.reduce((result, item) => {
    result[item] = false;
    return result;
}, {});
