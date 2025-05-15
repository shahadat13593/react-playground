import { useState, useEffect } from "react";
import CircularProgress from "./Circle";

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
  { name: "Category", bg: "#eef5f0", color: "var(--Color--1)" }, // existing neutral

  { name: "Breakfast", bg: "#f4f1ea", color: "#5a432a" }, // soft oat beige (earthy but clean)
  { name: "Lunch", bg: "#e3f5e8", color: "#306b42" }, // softened mint green (brand-linked)
  { name: "Dinner", bg: "#f6edea", color: "#5c2f2f" }, // dusty rose-beige (warm elegance)
  { name: "Snack", bg: "#fdf6e3", color: "#645c33" }, // mellow warm cream (rich but airy)
];

const timeSlotOptions = [
  { name: "Time Slot", bg: "#f1f4fa", color: "#2e3e50" }, // base neutral

  { name: "Morning", bg: "#e6f4f1", color: "#2c5e57" }, // fresh aqua green (morning freshness)
  { name: "Afternoon", bg: "#edf4fe", color: "#365480" }, // gentle sky blue
  { name: "Evening", bg: "#f3edf9", color: "#57387d" }, // twilight lavender
  { name: "Night", bg: "#e8ebf2", color: "#2e3243" }, // soft dusk slate
];
const activityFactors = {
  sedentary: 1.2,
  lightly: 1.375,
  moderate: 1.55,
  very: 1.725,
  extra: 1.9,
};

// !------------ App ---------------------
function getBmiStatus(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 24.9) return "Normal";
  if (bmi < 29.9) return "Overweight";
  return "Obese";
}

function calculateDailyDeficit(targetWeightLoss, totalDays) {
  return Math.round((targetWeightLoss * 7700) / totalDays);
}
function BMI(weight, height) {
  const heightInMeters = height / 100;
  return Math.round(weight / heightInMeters ** 2);
}
const users = [
  {
    userName: "r7",
    fullName: "Raiyan",
    password: 1234,

    weight: 70,
    height: 175,
    age: 24,
    gender: "male",
    activityLevel: "moderate",
    targetWeightLoss: 3,
    totalDays: 45,
    dailyDeficit: 0,

    bmiGoals: {
      bmi: 22,
      goalKcal: 0,
      toBurnKcal: 0,
      toWalkMiles: 0,
    },

    summary: {
      mealsLogged: 0,
      totalSpent: 0,
      bmiStatus: "",
      totalBurnedKcal: 0,
    },
  },
];

export default function App() {
  const [user, setUser] = useState(users[0]);
  const [meals, setMeals] = useState([]);

  const [progress, setProgress] = useState({
    consumed: 0,
    burned: 0,
    distance: 0,
  });
  console.log(user);
  console.log(meals);
  useEffect(() => {
    const {
      weight,
      height,
      age,
      gender,
      activityLevel,
      targetWeightLoss,
      totalDays,
    } = user;

    // Calculate total meals and spending
    const totalMeal =
      Math.round(meals.reduce((sum, meal) => sum + meal.quantity, 0)) || 0;
    const totalPrice =
      Math.round(meals.reduce((sum, meal) => sum + meal.price, 0)) || 0;

    // BMI calculation
    const bmi = BMI(weight, height);
    const BMIStatus = getBmiStatus(bmi);

    // Calculate BMR
    const BMR =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    // Activity level factor
    const TDEE = Math.round(BMR * activityFactors[activityLevel]);

    // Daily deficit to meet weight loss goal
    const dailyDeficit = calculateDailyDeficit(targetWeightLoss, totalDays);

    // Daily calorie goal after deficit
    const goalKcal = Math.round(TDEE - dailyDeficit);

    // Total goal burn for entire weight loss
    const toBurnKcal = Math.round(targetWeightLoss * 7700);

    // Equivalent distance to burn goal kcal (assuming 100 kcal/mile)
    const toWalkMiles = Math.round(toBurnKcal / 100);

    // Total consumed from meals
    const totalCaloriesConsumed = meals.reduce((sum, m) => sum + m.calories, 0);

    // Estimate burned kcal from activity (simulate 60% of intake burned)
    const totalBurnedKcal = Math.round(totalCaloriesConsumed * 0.6);

    // Estimate distance covered (100 kcal ≈ 1 mile)
    const distanceCovered = Math.round(totalBurnedKcal / 100);

    // === Balanced Progress Calculation (based on goalKcal) ===
    const percentConsumed = goalKcal
      ? Math.min(Math.round((totalCaloriesConsumed / goalKcal) * 100), 100)
      : 0;

    const percentBurned = goalKcal
      ? Math.min(Math.round((totalBurnedKcal / goalKcal) * 100), 100)
      : 0;

    const percentDistance = goalKcal
      ? Math.min(Math.round((distanceCovered * 100) / (goalKcal / 100)), 100)
      : 0;

    // Update progress rings
    setProgress({
      consumed: percentConsumed,
      burned: percentBurned,
      distance: percentDistance,
    });

    // Update user state
    setUser((curUser) => ({
      ...curUser,
      dailyDeficit,
      bmiGoals: {
        bmi,
        goalKcal,
        toBurnKcal,
        toWalkMiles,
      },
      summary: {
        mealsLogged: totalMeal,
        totalSpent: totalPrice,
        bmiStatus: BMIStatus,
        totalBurnedKcal,
      },
    }));
  }, [meals]);
  function handleAddMeal(meal) {
    setMeals((cur) => [...cur, meal]);
  }

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
      <Main>
        <Dashboard user={user} progress={progress} />
        <MealDataShow meals={meals} />
        <MealAddForm onAddMeal={handleAddMeal} />
      </Main>
    </div>
  );
}

// !------------ Main ---------------------

function Main({ children }) {
  return <div className="main">{children}</div>;
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

// !------------ Dashboard---------------------

function Dashboard({ user, progress }) {
  return (
    <div className="dashboard container">
      <h3 className="dashboard-heading-3">Dashboard</h3>
      <div className="dashboard-row-box">
        <DashboardRow>
          <CircularProgress
            id="1"
            progress={progress.consumed}
            size={200}
            gradientColors={["#A8E6CF", "#DCEDC1"]}
            textColor="#4CAF50"
            backgroundColor="#f8f9fa"
            animationDuration={1500}
            animationTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)"
          />
          <DashboardRowTitle>🥗 Calories Consume</DashboardRowTitle>
        </DashboardRow>
        <DashboardRow>
          <CircularProgress
            id="2"
            progress={progress.burned}
            size={200}
            gradientColors={["#FFD3B6", "#FFAAA5"]}
            textColor="#FF5722"
            backgroundColor="#fff8f4"
            animationDuration={1500}
            animationTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)"
          />
          <DashboardRowTitle>🔥 Calories Burned </DashboardRowTitle>
        </DashboardRow>
        <DashboardRow>
          <CircularProgress
            id="3"
            progress={progress.distance}
            size={200}
            gradientColors={["#B2EBF2", "#B39DDB"]}
            textColor="#3F51B5"
            backgroundColor="#f6f7fb"
            animationDuration={1500}
            animationTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)"
          />
          <DashboardRowTitle>🚶‍♂️ Distance Covered</DashboardRowTitle>
        </DashboardRow>
      </div>

      <Box title={"BMI & Goals"}>
        <BmiAndGoalBox
          title={"BMI"}
          number={user.bmiGoals.bmi}
          color={"color-1"}
        />
        <BmiAndGoalBox
          title={"Goal (kcal)"}
          number={user.bmiGoals.goalKcal}
          color={"color-2"}
        />
        <BmiAndGoalBox
          title={"To Burn (kcal)"}
          number={user.bmiGoals.toBurnKcal}
          color={"color-3"}
        />
        <BmiAndGoalBox
          title={"To Walk (mi)"}
          number={user.bmiGoals.toWalkMiles}
          color={"color-4"}
        />
      </Box>

      <Box title={"Summary"}>
        <BmiAndGoalBox
          title={"Meals Logged"}
          number={user.summary.mealsLogged}
          color={"color-5"}
        />
        <BmiAndGoalBox
          title={"Total Spent"}
          number={user.summary.totalSpent}
          color={"color-6"}
        />
        <BmiAndGoalBox
          title={"BMI Status"}
          number={user.summary.bmiStatus}
          color={"color-7"}
        />
        <BmiAndGoalBox
          title={"Total Burned (kcal)"}
          number={user.summary.totalBurnedKcal}
          color={"color-8"}
        />
      </Box>
    </div>
  );
}
// ? ------------------ Box  ------------------

function Box({ title, children }) {
  return (
    <div className="box">
      <h3>{title}</h3>
      <div className="BMI-goal-boxs">{children}</div>
    </div>
  );
}

// ? ------------------ Bmi And Goal Box ------------------
function BmiAndGoalBox({ title, number, color }) {
  return (
    <div className={`bg-box ${color}`}>
      <p className="sub-title">
        {title}:{" "}
        <span>
          <strong>{number}</strong>
        </span>
      </p>
    </div>
  );
}
// ? ------------------ Dashboard Row  ------------------

function DashboardRow({ children }) {
  return <div className="dashboard-row">{children}</div>;
}

// ? ------------------ Dashboard Row Title  ------------------
function DashboardRowTitle({ children }) {
  return <h4 className="circle-title">{children}</h4>;
}

// !------------ Meal Add Form ---------------------

function MealAddForm({ onAddMeal }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");

  const meal = predefinedMeals.find((cur) => cur.name === name);
  const calories = meal?.calories && quantity ? meal.calories * quantity : "";
  const price = meal?.price && quantity ? meal.price * quantity : "";
  const ingredients =
    predefinedMeals.find((cur) => cur.name === name)?.ingredients || [];
  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !category || !timeSlot || !date || !quantity) return;

    const newMeal = {
      id: crypto.randomUUID(),
      name,
      timeSlot,
      date,
      quantity,
      calories,
      ingredients,
      price,
      category,
    };

    onAddMeal(newMeal);

    setName("");
    setCategory("");
    setTimeSlot("");
    setDate("");
    setQuantity("");
  }

  return (
    <div className="container">
      <h3>🧑‍🍳 Plan Your Next Meal</h3>
      <form className="meal-add-form" onSubmit={handleSubmit}>
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
        <input
          type="number"
          placeholder="Price"
          value={price}
          readOnly={true}
        />
        <input type="submit" value="Add Meal" className="btn btn-submit" />
      </form>
    </div>
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

// !------------ Meal Table ---------------------

function MealDataShow({ meals }) {
  return (
    <div className="container--2">
      <h3>🥗 Your Planned Meals</h3>
      <table>
        <thead>
          <tr>
            <th>Meal</th>
            <th>Ingredients</th>
            <th>Category</th>
            <th>Time Slot</th>
            <th>Date</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((cur) => (
            <MealDataRow mealData={cur} key={cur.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
// !------------ Meal Row ---------------------

function MealDataRow({ mealData }) {
  const categoryData = categoryOptions.find(
    (cur) => cur.name === mealData.category
  );
  const timeSlotData = timeSlotOptions.find(
    (cur) => cur.name === mealData.timeSlot
  );

  return (
    <tr>
      <td>{mealData.name}</td>
      <td>{mealData?.ingredients?.slice(0, 2).join(", ") + "..."}</td>
      <td>
        <p
          style={{
            backgroundColor: categoryData.bg,
            color: categoryData.color,
          }}
        >
          {mealData.category}
        </p>
      </td>

      <td>
        <p
          style={{
            backgroundColor: timeSlotData.bg,
            color: timeSlotData.color,
          }}
        >
          {mealData.timeSlot}
        </p>
      </td>

      <td>{mealData.date}</td>
      <td>{mealData.quantity}</td>
      <td>{mealData.price}</td>
      <td>
        {mealData.calories} <button>❌</button>
      </td>
    </tr>
  );
}
