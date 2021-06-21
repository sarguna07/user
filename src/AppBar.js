import React, { Component } from 'react'

export default class AppBar extends Component {
    render() {
        return (
            <>
                <div style={{ display: "flex", position: "fixed", width: "100%", top: "0px", zIndex: "1", borderBottom: "1px solid #1d77c2", background: "white" }}>
                    <div style={{ width: "93%" }}>
                        <h2 style={{
                            textAlign: "center",
                            margin: "0px",
                            padding: "20px 0px",
                            color: "#1d77c2",
                            fontWeight: "400"
                        }}>Dashboard of Users</h2>
                    </div>
                </div>
            </>
        )
    }
}
