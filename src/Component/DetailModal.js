import React from 'react'
export default function DetailModal(props) {

    console.log(props, "props")
    return (
        <div
            className={`modal ${props?.open ? "show" : "fade"}`}
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
            style={{ display: props?.open ? "block" : "none" }} >
            <div className="modal-dialog modal-dialog-centered modal-lg" >
                <div className="modal-content">
                    <div className="modal-header" style={{ backgroundColor: "#6d147a", color: "white" }}>
                        <h3 className="modal-title" id="staticBackdropLabel" >Contact Information</h3>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" onClick={() => props?.setOpen(false)} style={{ color: "white" }}></button>
                    </div>
                    <div className="modal-body">
                        <h4 className='font-weight-bold'> {`This is Inforamtion about ${props.detail.phone}`}</h4>
                        <ul class="no-bullets">
                            <li>Name : {props.detail.name}</li>
                            <li>Country : {props.detail.country}</li>
                            <li>Phone : {props.detail.phone}</li>
                            <li>Country Code : {props.detail.code}</li>
                        </ul>



                    </div>
                </div>
            </div>
        </div >
    )
}
