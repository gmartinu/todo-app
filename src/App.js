import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Button, 
  Divider, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  Grid, 
  IconButton, 
  makeStyles, 
  TextField, 
  Toolbar, 
  Typography, 
  List,
  Checkbox,
  ListItemIcon,
} from '@material-ui/core';
import { 
  GitHub, 
  Add, 
  Delete
} from '@material-ui/icons';
import DeleteBox from './DeleteBox';

// Cria os Estilos

const useStyles = makeStyles(theme => ({
  title:{
    marginLeft: theme.spacing(1)
  },
  content:{
    height: `calc(100% - 64px)`,
    display: "flex",
    justifyContent: "center",
    //alignItems: "center",
  },
  buttonWrapper: {
    display: "flex",
    alignContent: "center"
  },
  form:{
    // Utiliza a função padrão spacing do Material-ui
    padding: theme.spacing(2)
  },
  serrilhado:{
    textDecoration: "line-through",
    fontStyle: "oblique"
  }
}))


const App = () => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState(
    localStorage.getItem('tasks')?.length !== 0 ?
    JSON.parse(localStorage.getItem('tasks')) : []
  );
  const [modal, setModal] = useState({
    open: false,
    index: null
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if(value.trimEnd() === "") return;
    setTasks(oldValue => oldValue ? ([...oldValue, {title: value, cabo: false}]) : ([{title: value, cabo: false}]));
    setValue(oldValue => (""))
  }

  const handleDeleteBox = (index) => {
    setModal(oldValue => ({oldValue, open: true, index: index}))
  }

  const handleDelete = (index) => {
    const _temp = [...tasks];
    _temp.splice(index, 1)
    setTasks(_temp)
    setModal(false)
  }

  const handleToggle = (index) => {
    const _temp = [...tasks];
    // _temp[index].cabo ? true : false // Ternário alternativo a função utilizada abaixo.
    _temp[index].cabo = !(_temp[index].cabo);
    setTasks(_temp)
  }

  useEffect(() => {
    if(tasks?.length !== 0){
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton 
            onClick={() => window.open("https://github.com/gmartinu")} 
            edge="start" 
            color="inherit" 
            >
            <GitHub />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            To-do App - Exemplo
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Grid container className={classes.content}>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleAdd} className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={9} md={11}>
                  <TextField 
                    value={value} 
                    onChange={(e) => setValue(oldValue => (e.target.value))} 
                    fullWidth 
                    label="Task" 
                  />
                </Grid>
                <Grid item xs={3} md={1} className={classes.buttonWrapper}>
                  <Button type="submit" color="primary" variant="contained">
                    <Add />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <List>
                    {tasks ? 
                    tasks.map((task, index) => (
                      <div key={index}>
                        <ListItem button onClick={() => handleToggle(index)}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={task.cabo}
                              tabIndex={-1}
                              color="primary"
                              disableRipple
                              inputProps={{ 'aria-labelledby': index }}
                              />
                          </ListItemIcon>
                          <ListItemText
                            primary={task.title}
                            className={task.cabo ? classes.serrilhado : null}
                          />
                          <ListItemSecondaryAction onClick={() => handleDeleteBox(index)}>
                            <IconButton edge="end" aria-label="delete">
                              <Delete />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                      </div>
                    )):null}
                  </List>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>

      <DeleteBox 
        open={modal.open} 
        index={modal.index}
        handleClose={() => setModal(false)}
        handleConfirm={handleDelete}
      />
    </>
  );
}

export default App;

// ⡴⠑⡄⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠸⡇⠀⠿⡀⠀⠀⠀⣀⡴⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠑⢄⣠⠾⠁⣀⣄⡈⠙⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⢀⡀⠁⠀⠀⠈⠙⠛⠂⠈⣿⣿⣿⣿⣿⠿⡿⢿⣆⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⢀⡾⣁⣀⠀⠴⠂⠙⣗⡀⠀⢻⣿⣿⠭⢤⣴⣦⣤⣹⠀⠀⠀⢀⢴⣶
// ⠀⠀⢀⣾⣿⣿⣿⣷⣮⣽⣾⣿⣥⣴⣿⣿⡿⢂⠔⢚⡿⢿⣿⣦⣴⣾⠁⠸⣼
// ⠀⢀⡞⠁⠙⠻⠿⠟⠉⠀⠛⢹⣿⣿⣿⣿⣿⣌⢤⣼⣿⣾⣿⡟⠉⠀⠀⠀⠀
// ⠀⣾⣷⣶⠇⠀⠀⣤⣄⣀⡀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀
// ⠀⠉⠈⠉⠀⠀⢦⡈⢻⣿⣿⣿⣶⣶⣶⣶⣤⣽⡹⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠉⠲⣽⡻⢿⣿⣿⣿⣿⣿⣿⣷⣜⣿⣿⣿⡇⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⣶⣮⣭⣽⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⠿⠿⠿⠿⠛⠉
// Congrats, you found a shrek in the code
// this means that you're now shrekd for the
// rest of your life S2
