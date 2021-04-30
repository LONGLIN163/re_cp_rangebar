import React from "react"
import {render} from "react-dom"
import Range from "./Range"

let props={
    "width":600,
    "min":100,
    "max":8000,
}
render(
    <div>
        <Range {...props} />
    </div>,
    document.getElementById("container")
)