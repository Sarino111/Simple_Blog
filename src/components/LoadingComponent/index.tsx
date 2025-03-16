
'use client'

import React from 'react';

function Loading () {

    return (
        <>
            <div className="loading-container"
                style={{
                    position: "absolute",
                    top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: "10",
                    display: "flex", flexDirection: "row",
                    alignItems: "center", gap: "0.7rem"

            }}>
                <p
                    style={{
                        display: "flex", flexDirection: "row", 
                        justifyContent: "center", 
                        fontSize: "16px", fontWeight: "normal", 
                        color: "#000", 
                    }}
                >
                    Loading...
                </p>
            </div>
        </>
    );
};

export default Loading;