import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

const DashboardPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Total Schools</Typography>
            <Typography variant="h4">120</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Active Schools</Typography>
            <Typography variant="h4">100</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Admin Users</Typography>
            <Typography variant="h4">30</Typography>
          </Paper>
        </Grid>
        
      </Grid>
    </Box>
  );
};

export default DashboardPage;
