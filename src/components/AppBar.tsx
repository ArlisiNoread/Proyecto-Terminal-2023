import AppBarMui from '@mui/material/AppBar';


const AppBar: React.FC<{ titleText: string }> = ({ titleText }) => {

    return (
        <AppBarMui position="static" color="primary" >
            <p style={{ marginLeft: "10px" }}>{titleText.toUpperCase()}</p>
        </AppBarMui>
    );
}
export default AppBar;