import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import moment from "moment";
import axios from "axios";
import CheckIcon from '@mui/icons-material/Check';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useNavigate} from "react-router-dom";
import {Tooltip} from "@mui/material";
import {CheckCircleRounded} from "@mui/icons-material";



export default function PubItem({pub,onItemClick}) {
    const navigate = useNavigate();
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={pub.titre}
                subheader={moment(pub.date).format('DD/MM/YYYY')}
            />
            <CardMedia
                style={{width:'100%',height:'150px',objectFit: 'contain'}}
                component="img"
                image={axios.defaults.baseURL +"publication/sid/"+ pub.id_publication}
                alt="image not found"
            />
            <CardContent>
                <Typography variant="body2" className="pe-1 text-wrap" textAlign="justify" color="text.secondary">
                    {pub.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Tooltip title="Lire la suite" placement="top">
                <IconButton onClick={()=>{
                    navigate("detail/" + pub.id_publication)
                }}>
                    <MoreHorizIcon color="primary" fontSize='large'  />
                </IconButton>
                </Tooltip>
                {!pub.valide?(
                    <Tooltip title="Valider" placement="top">
                        <IconButton onClick={()=>{
                            onItemClick(pub.id_publication)
                        }}>
                            <CheckIcon color="success" fontSize='medium' />
                        </IconButton>
                    </Tooltip>
                )
                    :

                        <CheckCircleRounded color="success" fontSize='medium' />

                }


            </CardActions>
        </Card>
    );
}
