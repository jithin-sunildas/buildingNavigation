# 🗺️ 3D Indoor Navigation System

A web-based 3D indoor navigation system, powered by Rust and Axum, providing seamless navigation within buildings.

## 🚀 Features

* **🌐 3D Indoor Maps:** Interactive 3D maps of building interiors.
* **📍 Real-Time Location:** Utilizes a combination of GPS, Wi-Fi fingerprinting, and potentially BLE beacons for accurate indoor positioning.
* **🧭 Turn-by-Turn Navigation:** Provides clear and concise navigation instructions.
* **🔍 Search and Discovery:** Allows users to search for specific rooms or points of interest.
* **🏢 Multi-Floor Support:** Handles navigation across multiple floors.
* **⚡ High Performance:** Built with Rust and Axum for speed and efficiency.
* **📱 Mobile-Friendly:** Designed for optimal viewing on mobile devices.
* **📡 Sensor Fusion:** Optional integration of IMU sensor data for improved accuracy.

## 🛠️ Backend

The backend is built with **Rust** and **Axum**, focusing on performance and scalability.

* **Axum:** A fast and ergonomic web framework for Rust, handling API requests and responses.
* **PostgreSQL:** Used for persistent data storage, including building layouts, room locations, and navigation points.
* **Redis:** Implemented for caching frequently accessed data, enhancing performance.
* **Asynchronous Operations:** Leverages `tokio` for efficient handling of concurrent requests.
* **Database Connection Pooling:** Utilizes `r2d2` or `bb8` to optimize database connections.
* **CORS:** Properly configured for secure communication with the React frontend.
* **Dockerized:** Containerized for easy deployment and scalability.

### ⚙️ Backend API Endpoints

* `/buildings`: Retrieves building data (floor plans, details).
* `/rooms`: Retrieves room information (locations, details).
* `/navigation`: Calculates and returns navigation routes.
* `/location`: Handles indoor positioning data and location estimation.
* `/search`: Handles searching for specific rooms or POI.
* `/wifi`: Stores and retrieves wifi data.
* `/beacons`: Stores and retrieves beacon data.

### 📦 Dependencies

* `axum`: Web framework.
* `tokio`: Asynchronous runtime.
* `tokio-postgres`: PostgreSQL client.
* `redis`: Redis client.
* `serde`: Serialization and deserialization.
* `serde_json`: JSON handling.
* `r2d2` or `bb8`: Connection pooling.
* `tower-http`: CORS and other HTTP utilities.

## ⚛️ Frontend

The frontend is built with **React** and **Tailwind CSS**.

* **React:** Handles UI components and state management.
* **Tailwind CSS:** Provides utility-first styling.
* **Fetch/Axios:** Used for API requests to the Axum backend.
* **Three.js(Or your 3d library):** Used for rendering the 3d map.

## 🚀 Getting Started (Backend)

1.  **Prerequisites:**
    * Rust and Cargo installed.
    * PostgreSQL and Redis installed and running.
    * Docker (optional, for containerization).

2.  **Clone the repository:**

    ```bash
    git clone [repository URL]
    cd backend
    ```

3.  **Set up the database:**
    * Create a PostgreSQL database and user.
    * Configure database connection details in `config.rs` or environment variables.

4.  **Run the backend:**

    ```bash
    cargo run
    ```

5.  **Docker (optional):**

    ```bash
    docker-compose up --build
    ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## 📄 License

MIT License

## 📧 Contact

jithinsunildas6@gmail.com
