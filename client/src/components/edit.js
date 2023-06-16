import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";

export default function Edit() {
    const [form, setForm] = useState({
        name: "",
        location: "",
        country: ""
        
    });
    const params = useParams();
    const navigate = useNavigate();

    async function fetchData() {
        const id = params.id.toString();
        const response = await fetch(`http://localhost:5050/api/users/${params.id.toString()}`);

        if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const record = await response.json();
        if (!record) {
            window.alert(`Record with id ${id} not found`);
            navigate("/");
            return;
        }

        setForm({
            name: record.name,
            location: record.location,
            country: record.country,
        
        });
        console.log(form);
    }


    useEffect(() => {
        
        fetchData();
    }, []);

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedPerson = {
            name: form.name,
            location: form.location,
            country: form.country,
        };

        console.log(editedPerson);

        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5050/api/users/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(editedPerson),
            headers: {
                'Content-Type': 'application/json'
            },
        });

         navigate("/");
    }

    return (<div className="p-2 d-flex justify-content-center align-items-center">
        <h3 className="p-4">Edit</h3>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={form.name}
                    onChange={(e) => updateForm({name: e.target.value})}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                    type="text"
                    className="form-control"
                    id="location"
                    value={form.location}
                    onChange={(e) => updateForm({location: e.target.value})}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="name">Country</label>
                <input
                    type="text"
                    className="form-control"
                    id="country"
                    value={form.country}
                    onChange={(e) => updateForm({country: e.target.value})}
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="submit"
                    value="Edit track"
                    className="btn btn-primary mt-2"
                />
            </div>
        </form>
    </div>);
}