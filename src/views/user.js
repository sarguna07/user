import React, { Component } from 'react'
import { MDBDataTable } from 'mdbreact';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBInput,
} from 'mdbreact';
import { fetchUser, createUser, updateUser, showUser, deleteUser } from "../api/users";
import AppBar from "../AppBar";

class UserTable extends Component {
    constructor(props) {
        super(props);
        this.id = undefined;
        this.state = {
            openModal: false,
            openusercreatemodal: false,
            name: "",
            job: "",
            rowData: undefined,
            data: []
        }
    }

    createUserModel = () => {
        this.setState({
            openModal: true,
            name: "",
            job: "",
            openModal: false,
            openusercreatemodal: true,
        });
    }
    closeModal = () => {
        this.setState({
            openModal: false, rowData: undefined,
            openusercreatemodal: false,
        });
    }
    requestParams = () => {
        let { name,
            first_name,
            last_name,
            job,
            email
        } = this.state;
        return {
            first_name,
            last_name,
            name,
            email,
            job
        }
    }
    submitData = (e) => {
        updateUser(this.requestParams(), this.id)
            .then(data => {
                if (data.updatedAt) {
                    this.setState({
                        openModal: false,
                        openusercreatemodal: false,
                        first_name: "",
                        last_name: "",
                        email: ""
                    })
                    this.fetchTableData()
                }
            })
            .catch(error => {
                alert(error)
                console.log(error)
            });
    }
    createUserData = (e) => {
        createUser(this.requestParams())
            .then(data => {
                if (data.createdAt) {
                    this.setState({
                        openModal: false,
                        openusercreatemodal: false,
                        name: "",
                        job: "",
                    })
                    this.fetchTableData()
                }
            })
            .catch(error => {
                console.log(error)
            });
    }
    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    componentDidMount = () => {
        this.fetchTableData();
    }

    fetchTableData = () => {
        fetchUser()
            .then(({ data }) => {
                this.setState({
                    data: data
                });
            })
            .catch(error => {
                console.log(error)
            });
    };
    showRowUser = (id) => {
        showUser(id)
    }
    onRowClick = (row) => {
        this.id = row.id;
        this.showRowUser(row.id)
        this.setState({
            first_name: row.first_name,
            last_name: row.last_name,
            email: row.email,
            avatar: row.avatar,
            openModal: true,
        })
    }

    rowDelete = (row) => {
        deleteUser(row.id)
        this.fetchTableData()
    }

    render() {
        const { closeModal, submitData, handleChange, createUserModel, createUserData, rowDelete } = this;
        const { data, first_name, last_name, email, avatar, name, job } = this.state;

        let userData = []

        data?.map(q => (
            userData.push({
                first_name: <h5 className="usertable">{q.first_name}</h5>,
                last_name: <h5 className="usertable">{q.last_name}</h5>,
                email: <h5 className="usertable">{q.email}</h5>,
                avatar: <img src={q.avatar} alt="Avatar" width="100" height="100" />,

                edit_action: <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                        onClick={() => this.onRowClick(q)}
                        style={{
                            border: "1px solid #33B5E5",
                            background: "#33B5E5",
                            color: "white",
                            padding: "3px 20px",
                            borderRadius: "3px"
                        }}>Edit</button></div>,
                delete_action: <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                        onClick={() => this.rowDelete(q)}
                        style={{
                            border: "1px solid #e53535",
                            background: "#e53535",
                            color: "white",
                            padding: "3px 20px",
                            borderRadius: "3px"
                        }}>Delete</button></div>
            })
        ))
        const columnData = {
            columns: [
                {
                    label: 'Image',
                    field: 'avatar',
                    sort: 'disabled',
                    width: 250
                },
                {
                    label: 'First Name',
                    field: 'first_name',
                    sort: 'disabled',
                    width: 150
                },
                {
                    label: 'Last Name',
                    field: 'last_name',
                    sort: 'disabled',
                    width: 150
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'disabled',
                    width: 270
                },
                {
                    label: 'Edit',
                    field: 'edit_action',
                    sort: 'disabled',
                    width: 150
                },
                {
                    label: 'Delete',
                    field: 'delete_action',
                    sort: 'disabled',
                    width: 150
                }
            ],
            rows: [...userData]
        };

        return (
            <>
                <AppBar />
                <div style={{ width: "95%", margin: "auto" }}>
                    <div style={{ position: "absolute", width: "95%", top: "100px" }}>
                        <MDBCard >
                            <MDBCardBody>
                                <MDBCardTitle>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ display: "flex", marginLeft: "-20px", height: "45px", width: "95%" }}>
                                            <span style={{ width: "3px", marginRight: "10px", background: "#1D77C2" }}>
                                            </span>
                                            <h3 style={{ margin: "0px", color: "#1D77C2", marginTop: "6px", marginLeft: "5px" }}>List Of Users Here</h3>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <button
                                                style={{
                                                    background: "#33B5E5",
                                                    color: "white",
                                                    border: "1px solid #33B5E5",
                                                    outline: "none",
                                                    fontSize: "15px",
                                                    borderRadius: "5px",
                                                    padding: "5px 15px"
                                                }}
                                                onClick={() => createUserModel()}>
                                                Add User
                                            </button>
                                        </div>

                                        <MDBModal isOpen={this.state.openModal}>
                                            <MDBModalHeader>
                                                Users
                                            </MDBModalHeader>
                                            <MDBModalBody>
                                                <MDBInput label="First Name *" outline value={first_name} id="first_name" onChange={handleChange} style={{ padding: "10px 15px" }} />
                                                <MDBInput label="Last Name *" outline value={last_name} id="last_name" onChange={handleChange} style={{ padding: "10px 15px" }} />
                                                <MDBInput label="Email *" outline value={email} id="email" onChange={handleChange} style={{ padding: "10px 15px" }} />
                                                <MDBInput label="Avatar *" outline value={avatar} id="timeout" onChange={handleChange} style={{ padding: "10px 15px" }} />
                                            </MDBModalBody>
                                            <MDBModalFooter>
                                                <button onClick={() => closeModal()}
                                                    style={{
                                                        background: "#a6c",
                                                        color: "white",
                                                        border: "1px solid #a6c",
                                                        outline: "none",
                                                        fontSize: "16px",
                                                        borderRadius: "5px",
                                                        padding: "7px 20px"
                                                    }}>
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    onClick={submitData}
                                                    style={{
                                                        background: "#4185f4",
                                                        color: "white",
                                                        border: "1px solid #4185f4",
                                                        outline: "none",
                                                        fontSize: "16px",
                                                        borderRadius: "5px",
                                                        padding: "7px 20px"
                                                    }}>Save
                                                </button>
                                            </MDBModalFooter>
                                        </MDBModal>
                                        <MDBModal isOpen={this.state.openusercreatemodal}>
                                            <MDBModalHeader>
                                                Users
                                            </MDBModalHeader>
                                            <MDBModalBody>
                                                <MDBInput label="Name" outline value={name} id="name" onChange={handleChange} style={{ padding: "10px 15px" }} />
                                                <MDBInput label="Job" outline value={job} id="job" onChange={handleChange} style={{ padding: "10px 15px" }} />
                                            </MDBModalBody>
                                            <MDBModalFooter>
                                                <button onClick={() => closeModal()}
                                                    style={{
                                                        background: "#a6c",
                                                        color: "white",
                                                        border: "1px solid #a6c",
                                                        outline: "none",
                                                        fontSize: "16px",
                                                        borderRadius: "5px",
                                                        padding: "7px 20px"
                                                    }}>
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    onClick={createUserData}
                                                    style={{
                                                        background: "#4185f4",
                                                        color: "white",
                                                        border: "1px solid #4185f4",
                                                        outline: "none",
                                                        fontSize: "16px",
                                                        borderRadius: "5px",
                                                        padding: "7px 20px"
                                                    }}>Save
                                                </button>
                                            </MDBModalFooter>
                                        </MDBModal>

                                    </div>
                                </MDBCardTitle>
                                <MDBCardText>
                                    <MDBDataTable
                                        striped
                                        bordered
                                        small
                                        data={columnData}
                                    />
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                </div>
                <div style={{ height: "170px" }}></div>
            </>
        );
    }
}
export default UserTable;