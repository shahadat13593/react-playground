import { useState } from "react";

const userInformation = [
  {
    userName: "sh",
    fullName: "Shahadat Hossain",
    password: 1234,
  },
];

const predefinedMeals = [
  {
    id: 1,
    name: "🔽 Choose an Item",
  },
  {
    id: 2,
    name: "🍗 Chicken Rice Bowl",
    ingredients: [
      "Chicken Breast",
      "Brown Rice",
      "Broccoli",
      "Olive Oil",
      "Spices",
    ],
    calories: 550,
    price: 6.99,
  },
  {
    id: 3,
    name: "🥣 Oats with Banana",
    ingredients: ["Rolled Oats", "Milk", "Banana", "Honey", "Chia Seeds"],
    calories: 320,
    price: 3.49,
  },
  {
    id: 4,
    name: "🍣 Grilled Salmon",
    ingredients: ["Salmon Fillet", "Asparagus", "Olive Oil", "Lemon", "Garlic"],
    calories: 600,
    price: 9.99,
  },
  {
    id: 5,
    name: "🌯 Veggie Wrap",
    ingredients: ["Tortilla", "Lettuce", "Tomato", "Cucumber", "Hummus"],
    calories: 400,
    price: 4.99,
  },
  {
    id: 6,
    name: "🥤 Fruit Smoothie",
    ingredients: ["Banana", "Strawberry", "Yogurt", "Milk", "Honey"],
    calories: 250,
    price: 3.99,
  },
  {
    id: 7,
    name: "🍳 Scrambled Eggs",
    ingredients: ["Eggs", "Milk", "Salt", "Pepper", "Butter"],
    calories: 300,
    price: 2.99,
  },
  {
    id: 8,
    name: "🥗 Greek Salad",
    ingredients: ["Cucumber", "Tomato", "Feta Cheese", "Olives", "Olive Oil"],
    calories: 280,
    price: 4.49,
  },
  {
    id: 9,
    name: "🍞 Peanut Butter Toast",
    ingredients: ["Whole Wheat Bread", "Peanut Butter", "Banana Slices"],
    calories: 350,
    price: 2.49,
  },
  {
    id: 10,
    name: "🍝 Spaghetti Bolognese",
    ingredients: [
      "Spaghetti",
      "Ground Beef",
      "Tomato Sauce",
      "Garlic",
      "Onion",
    ],
    calories: 700,
    price: 7.99,
  },
  {
    id: 11,
    name: "🍛 Lentil Curry",
    ingredients: ["Lentils", "Coconut Milk", "Onion", "Garlic", "Curry Powder"],
    calories: 500,
    price: 5.49,
  },
  {
    id: 12,
    name: "🍕 Veggie Pizza Slice",
    ingredients: [
      "Pizza Dough",
      "Tomato Sauce",
      "Bell Pepper",
      "Mushroom",
      "Cheese",
    ],
    calories: 400,
    price: 3.49,
  },
  {
    id: 13,
    name: "🥪 Turkey Sandwich",
    ingredients: [
      "Whole Grain Bread",
      "Turkey",
      "Lettuce",
      "Tomato",
      "Mustard",
    ],
    calories: 450,
    price: 4.99,
  },
  {
    id: 14,
    name: "🍌 Banana Pancakes",
    ingredients: ["Banana", "Eggs", "Oats", "Vanilla", "Baking Powder"],
    calories: 390,
    price: 3.99,
  },
  {
    id: 15,
    name: "🍲 Chicken Soup",
    ingredients: ["Chicken", "Carrot", "Celery", "Onion", "Chicken Broth"],
    calories: 300,
    price: 4.49,
  },
  {
    id: 16,
    name: "🍫 Protein Bar",
    ingredients: ["Protein Blend", "Oats", "Chocolate Chips", "Honey", "Nuts"],
    calories: 220,
    price: 2.99,
  },
];

const categoryOptions = [
  { name: "📂 Category" },
  { name: "🍳 Breakfast" },
  { name: "🥪 Lunch" },
  { name: "🍽️ Dinner" },
  { name: "🍿 Snack" },
];

const timeSlotOptions = [
  { name: "⏰ Time Slot" },
  { name: "🌅 Morning" },
  { name: "🏞️ Afternoon" },
  { name: "🌇 Evening" },
  { name: "🌙 Night" },
];

const Meals = [
  {
    id: 1,
    name: "🍗 Chicken Rice Bowl",
    ingredients: [
      "Chicken Breast",
      "Brown Rice",
      "Broccoli",
      "Olive Oil",
      "Spices",
    ],
    quantity: 2,
    calories: 1100,
    price: 13.98,
    category: "🍳 Breakfast",
    timeSlot: "🌅 Morning",
    date: "2025-05-10",
  },
  {
    id: 2,
    name: "🥣 Oats with Banana",
    ingredients: ["Rolled Oats", "Milk", "Banana", "Honey", "Chia Seeds"],
    quantity: 1,
    calories: 320,
    price: 3.49,
    category: "🍳 Breakfast",
    timeSlot: "🌙 Night",
    date: "2025-05-10",
  },
];

// !------------ App ---------------------

export default function App() {
  const [user, setUser] = useState(userInformation[0]);

  return (
    <div className="app">
      <Header>
        {user ? (
          <>
            <Logo />
            <Navbar />
            <UserProfile />
          </>
        ) : (
          <>
            <BeforeLoginText />
            <Logo />
            <LoginInput />
          </>
        )}
      </Header>
      <Main>{/* <MealAddForm /> */}</Main>
    </div>
  );
}

// !------------ Main ---------------------

function Main({ children }) {
  return <div className="main container">{children}</div>;
}

// !------------ Header ---------------------

function Header({ children }) {
  return <header className="main-header">{children}</header>;
}
// ? ------------ Before Login Text ---------------------
function BeforeLoginText() {
  return <p className="login-Text">Log in to get started</p>;
}
// ? ------------ Login Input ---------------------
function LoginInput() {
  return (
    <form className="login-form">
      <input type="text" placeholder="user" />
      <input type="number" placeholder="PIN" />
      <button className="login-btn">&rarr;</button>
    </form>
  );
}
// ? ------------ Logo ---------------------
function Logo() {
  return (
    <div className="Logo-box">
      <ion-icon name="restaurant-outline" className="logo-icon"></ion-icon>
      <h2 className="logo-name">BiteWise</h2>
    </div>
  );
}
// ? ------------ Navbar---------------------
function Navbar() {
  return (
    <div className="nav-bar">
      <ul className="nav-list">
        <li className="nav-list-item">
          <a href="#" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-list-item">
          <a href="#" className="nav-link">
            Dashboard
          </a>
        </li>
        <li className="nav-list-item">
          <a href="#" className="nav-link">
            Meal Planner
          </a>
        </li>
        <li className="nav-list-item">
          <a href="#" className="nav-link">
            Shopping List
          </a>
        </li>
      </ul>
    </div>
  );
}
// ? ------------ User Profile ---------------------
function UserProfile() {
  return (
    <div className="UserProfile-box">
      <img
        src="https://i.pravatar.cc/100?img=15"
        alt=""
        className="user-profile"
      />
    </div>
  );
}

// !------------ Meal Add Form ---------------------

function MealAddForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");

  const meal = predefinedMeals.find((cur) => cur.name === name);
  const calories = meal?.calories && quantity ? meal.calories * quantity : "";
  const price = meal?.price && quantity ? meal.price * quantity : "";

  return (
    <form className="meal-add-form">
      <h2 className="meal-form-title"> Add a New Meal </h2>
      <SelectInput
        options={predefinedMeals}
        str="🔽 Choose an Item"
        value={name}
        setValue={setName}
      />
      <SelectInput
        options={categoryOptions}
        str={"📂 Category"}
        value={category}
        setValue={setCategory}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <SelectInput
        options={timeSlotOptions}
        str="⏰ Time Slot"
        value={timeSlot}
        setValue={setTimeSlot}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) =>
          setQuantity(
            e.target.value === ""
              ? ""
              : +e.target.value < 1
              ? ""
              : +e.target.value
          )
        }
      />

      <input
        type="number"
        placeholder="Calories"
        value={calories}
        readOnly={true}
      />
      <input type="number" placeholder="Price" value={price} readOnly={true} />

      <input type="submit" value="Add Meal" className="btn btn-submit" />
    </form>
  );
}

// !------------ Select ---------------------
function SelectInput({ options, str = "", value, setValue }) {
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)}>
      {options.map((curOption, i) => (
        <option value={str === curOption.name ? "" : curOption.name} key={i}>
          {curOption.name}
        </option>
      ))}
    </select>
  );
}
