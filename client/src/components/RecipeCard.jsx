import React from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const RecipeCard = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
      />
      <CardMedia
        component="img"
        height="auto"
        image={props.src}
        alt={props.src}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <b>Used Ingredients: </b>{props.usedIngredients.join(', ')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Missing Ingredients: </b>{props.missingIngredients.join(', ')}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add missing" onClick={() => {
          console.log('clicked');
          console.log(props.missingIngredients);
          return props.addMissing(props.missingIngredients)
        }}>
          <AddShoppingCartIcon />
        </IconButton>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      
    </Card>

    // <div className="card">
    //   <h1 className="recipe-title">{props.title}</h1>
    //   <img alt="" src={props.src} />
    //   <div className="used-ingredients"><b>Used Ingredients: </b><span>{props.usedIngredients.join(', ')}</span></div>
    //   <div className="missing-ingredients"><b>Missing Ingredients: </b><span>{props.missingIngredients.join(', ')}</span></div>
    //   <button type="button" className="btn-ingredients" onClick={() => props.addMissing(props.missingIngredients)}>Add Missing Ingredients</button>
    //   <div>
    //     <button type="button" className="btn-ingredients">More Info</button>
    //     <button type="button" className="btn-ingredients">❤️</button>
    //   </div>
    // </div>
  )
};

export default RecipeCard;