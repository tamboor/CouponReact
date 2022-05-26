import ManageUsers from "../ManageUsers/ManageUsers";
import "./AdminHomepage.css";

function AdminHomepage(): JSX.Element {
  return (
    <div className="AdminHomepage">
      <ManageUsers />
    </div>
  );
}

export default AdminHomepage;
