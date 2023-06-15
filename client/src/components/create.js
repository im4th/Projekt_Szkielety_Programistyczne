import React, {useState} from "react";
import {useNavigate} from "react-router";

export default function Create() {
    const [form, setForm] = useState({
        circuidId: "", name: "", location: "", country: "",
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newTrack = {...form};

        await fetch("http://localhost:5050/api/users/create", {
            method: "POST", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify(newTrack),
        })
            .catch(error => {
                window.alert(error);
            });
        setForm({circuidId: "", name: "", location: "", country: ""});
        navigate("/list");
    }

    return (<div className="p-2 d-flex justify-content-center align-items-center">
        <h3 className="p-4">Create New Record</h3>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={form.name}
                    onChange={(e) => updateForm({name: e.target.value})}
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
                />
            </div>
            <div className="form-group">
                <input
                    type="submit"
                    value="Add track"
                    className="btn btn-primary mt-2"
                />
            </div>
        </form>
    </div>);
}

//
// <div className="input-group mb-3">
//     <div className="input-group-prepend">
//         <span className="input-group-text" id="basic-addon1">@</span>
//     </div>
//     <input type="text" className="form-control" placeholder="Username" aria-label="Username"
//            aria-describedby="basic-addon1">
// </div>
//
// <div className="input-group mb-3">
//     <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username"
//            aria-describedby="basic-addon2">
//         <div className="input-group-append">
//             <span className="input-group-text" id="basic-addon2">@example.com</span>
//         </div>
// </div>
//
// <label htmlFor="basic-url">Your vanity URL</label>
// <div className="input-group mb-3">
//     <div className="input-group-prepend">
//         <span className="input-group-text" id="basic-addon3">https://example.com/users/</span>
//     </div>
//     <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3">
// </div>
//
// <div className="input-group mb-3">
//     <div className="input-group-prepend">
//         <span className="input-group-text">$</span>
//     </div>
//     <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)">
//         <div className="input-group-append">
//             <span className="input-group-text">.00</span>
//         </div>
// </div>
//
// <div className="input-group">
//     <div className="input-group-prepend">
//         <span className="input-group-text">With textarea</span>
//     </div>
//     <textarea className="form-control" aria-label="With textarea"></textarea>
// </div>