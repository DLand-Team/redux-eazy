import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function TabNav({ onChange, value, tabConfig }: { tabConfig: { value: string, title: string }[], value?: string | number; onChange?: (value: string | number) => void }) {
  const [val, setValue] = React.useState<string | number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    onChange?.(newValue)
  };
  React.useEffect(() => {
    if (value !== undefined && value != val) {
      setValue(value)
    }
  }, [value])

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={val}
        onChange={handleChange}
        variant="scrollable"
        aria-label="scrollable auto tabs example"
      >
        {
          tabConfig.map((item) => {
            return <Tab key={item.title} label={item.title} />
          })
        }
      </Tabs>
    </Box>
  );
}