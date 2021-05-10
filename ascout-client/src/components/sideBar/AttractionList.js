import {
    ListItem,
    IconButton,
    List,
    Avatar
} from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear';
import React from 'react'


export default function AttractionList({ attractions, onRemoveAttraction }) {

    const attractionList = attractions && attractions.map(function(attraction){
        return (
            <ListItem key={attraction.placeId}>
                <Avatar src={attraction.pictureUrl} />
                <span style={{padding: '1em'}}>{attraction.name}</span>
                <IconButton
                    aria-label="delete"
                    style={{
                        float: 'right',
                        alignSelf: 'flex-end'
                    }}
                    onClick = {() => { onRemoveAttraction(attraction) }}
                >
                    <ClearIcon />
                </IconButton>
            </ListItem>
        );
    })

    return (
        <List component="nav" aria-label="secondary mailbox folders">
            {attractionList}
        </List>
    );
}