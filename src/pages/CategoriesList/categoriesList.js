import React from 'react';
import { useState, setState } from "react";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import AddItemIcon from '@material-ui/icons/Add';
import DeleteItemIcon from '@material-ui/icons/Delete';
import UpdateItemIcon from '@material-ui/icons/Update';
import { v4 as uuidv4 } from 'uuid';

const CategoriesList = () => {
  const docs = initialList.documents;  //this coming from a json file, please see below for the sample json

  return (

      <div>
        <List component='nav' aria-labelledby='nested-list-subheader' style={{ color: "#4E9F3D" }}>
          {docs.map(doc => {
            return (
              <CustomizedListItem key={doc.id} doc={doc}/>
            );
          })}
        </List>     
      </div>
    );
  
}

 const CustomizedListItem = (props) =>  {
    const { doc } = props;

    const [list, setList] = useState(initialList);
    const [open, setOpen] = useState(false);
    const [name, setName] = React.useState('');
    const [quantity, setQuantity] = React.useState('');

    function handleClick() {
      setOpen(!open);
    }

    function handleChange(event) {
      if (event.target.name === "name")
        setName(event.target.value);
      if (event.target.name === "quantity")
        setQuantity(event.target.value);
    }
  
    function handleAdd() {
      if(name != ""){
        list.documents[0].Sheets.push({
          id: uuidv4(),
          "Id": list.documents[0].Sheets.length,
          "Title": name,
          "Quantity": quantity
        });

        setName('');
        setQuantity('');
      }
    }
    function handleUpdate(id) {
      // todo
    }

    function deleteHandler(e, id) {
      const index = id;
      //copy array
      list.documents[0].Sheets.splice(index -1 , 1);

      const newAray = list.documents[0].Sheets.slice();
      setList(newAray);
    }
  
  return (
    <div>
      <ListItem button key={doc.Id} onClick={handleClick}>
        <ListItemText primary={doc.Name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse
        key={doc.Sheets.Id}
        in={open}
        timeout='auto'
        unmountOnExit
      >
      <List component='li' disablePadding key={doc.Id}>
        {doc.Sheets.map(sheet => {
          return (
            <ListItem button key={sheet.Id}>
              <ListItemIcon>
                {/* <InsertDriveFileTwoToneIcon /> */}
              </ListItemIcon>
              <ListItemText key={sheet.Title} primary={sheet.Title} />
              <ListItemText key={sheet.Title} primary={sheet.Quantity} />

              <button type="button" onClick={handleUpdate()}>
                <UpdateItemIcon/>                
              </button>
              <button type="button" onClick={e=>deleteHandler(e, sheet.Id)}>
                <DeleteItemIcon/>
              </button>
            </ListItem>
          );
        })}
        <ListItem button key="10">
              <ListItemIcon>

                {/* <InsertDriveFileTwoToneIcon /> */}
              </ListItemIcon>
              <input type="text" name={"name"} value={name} onChange={handleChange} />
              <input type="text" name={"quantity"} value={quantity} onChange={handleChange} />
              <button type="button" onClick={handleAdd}>
                  Add new
                </button>               
              <AddItemIcon/>

            </ListItem>
      </List> 
    </Collapse>
    <Divider />
    </div>
    
    )
}


const initialList = {
  "documents": [
    {
      "Id": 1,
      "Name": "Current list",
      "Sheets": [
        {
          "Id": 1,
          "Title": "Maramice ",
          "Quantity": "10 "
        },
        {
          "Id": 2,
          "Title": "Šampon",
          "Quantity": "1 "
        },
        {
          "Id": 3,
          "Title": "Title 3",
          "Quantity": "4 "

        }
      ]
    },
    {
      "Id": 1,
      "Name": "Category 2",
      "Sheets": [
        {
          "Id": 1,
          "Title": "Title1 ",
          "Quantity": "1 "

        },
        {
          "Id": 2,
          "Title": "Title 2",
          "Quantity": "1 "

        },
        {
          "Id": 3,
          "Title": "Title 3",
          "Quantity": "1 "

        }
      ]
    }
  ]
}

export default CategoriesList;