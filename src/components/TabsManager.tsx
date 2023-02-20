import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CalculateIcon from '@mui/icons-material/Calculate';
import StorageIcon from '@mui/icons-material/Storage';
import HelpIcon from '@mui/icons-material/Help';
import { SxProps, Theme } from '@mui/material';


const TabsManager: React.FC<{ tabNumber: number, setTabNumber: Function }> = ({ tabNumber, setTabNumber }) => {

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabNumber(newValue);
    }

    const estiloBotones: SxProps<Theme> = { fontSize: '10px' };

    return (
        <Tabs value={tabNumber}
            onChange={handleTabChange}
            aria-label="Tabs Calculadora"
            variant="fullWidth"
            sx={{ backgroundColor: '#B6DCD4' }}
        >
            <Tab icon={<CalculateIcon />} label="Calculadora" sx={estiloBotones} />
            <Tab icon={<StorageIcon />} label="Historial" sx={estiloBotones} />
            <Tab icon={<HelpIcon />} label="Ayuda" sx={estiloBotones} />
        </Tabs>
    );
}

export default TabsManager;