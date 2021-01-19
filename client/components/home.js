import React from 'react'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box
} from '@material-ui/core'

export const HomePage = () => {
  return (
    <div>
      <Card>
        <CardActionArea>
          <CardContent>
            <Box display="flex" justifyContent="center">
              <Typography variant="h6" component="h3">
                Buy prints and reproductions of artwork by famous artists like
                Frida Kahlo, Yayoi Kusama, and Andy Warhol.
              </Typography>
            </Box>
          </CardContent>
          <CardMedia
            image="https://hirshhorn.si.edu/wp-content/uploads/2016/12/Eternity2.jpg"
            style={{height: 1, width: '100vw', paddingTop: '55%'}}
          />
        </CardActionArea>
      </Card>
    </div>
  )
}
