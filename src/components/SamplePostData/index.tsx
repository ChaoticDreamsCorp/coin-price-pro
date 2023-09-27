import { useState } from "react";
import { SampleData } from "./type";

const SAMPLE_DATA_INIT_STATE = {
  name: "",
  age: 0,
  email: "",
};

function SamplePostData() {
  const [sampleData, setSampleData] = useState<SampleData>(SAMPLE_DATA_INIT_STATE);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setSampleData({
      ...sampleData,
      [name]: value,
    });
  };

  const isValidInput = function ({ age, email, name }: SampleData): boolean {
    if (age <= 0) return false;
    if (email === "") return false;
    if (name === "Manuel Saleta") return false;
    return true;
  };

  async function addSampleData({ age, email, name }: SampleData) {
    setLoading(true); // Start loading

    const apiUrl = "http://localhost:3000/api/add-sample-data";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Sample data added:", data);
      setFormSubmitted(true);
      setSuccess(true); // Show success alert
    } catch (error) {
      console.error("Error:", error);
      setSuccess(false); // Hide success alert on error
    } finally {
      setLoading(false); // Stop loading
    }
  }

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = isValidInput(sampleData);
    if (isValid) {
      await addSampleData(sampleData);
    }
  };

  return (
    <>
      <div>
        {loading ? ( // Show loader if loading
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only d-none">Loading...</span>
          </div>
        ) : formSubmitted ? ( // Show success alert if data submitted
          <div className="alert alert-success text-dark" role="alert">
            Data submitted successfully!
          </div>
        ) : (
          // Show form if neither loading nor data submitted
          <div id="sample-data-form">
            <form onSubmit={submitData} className="row row-cols-lg-auto g-3 align-items-center justify-content-center">
              <div className="col-12">
                <label htmlFor="inputEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  value={sampleData.email}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  name="name"
                  placeholder="Name"
                  onChange={handleInputChange}
                  value={sampleData.name}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="inputAge"
                  name="age"
                  placeholder="18"
                  onChange={handleInputChange}
                  value={sampleData.age}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-auto">
                Save
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default SamplePostData;
