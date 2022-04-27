import { Button } from "@mui/material";
import "./Navbar.css";

function Navbar(): JSX.Element {
    return (
        <div className="Navbar">
			{/* <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul> */}
            <Button variant="contained">
           1
            </Button>
            <Button variant="contained">
            2
            </Button>
            <Button variant="contained">
            3
            </Button>

        </div>
    );
}

export default Navbar;
