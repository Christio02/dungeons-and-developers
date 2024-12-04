import { useQuery } from '@apollo/client';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { GET_MONSTER_REVIEWS } from '../../graphql/queries/monsterQueries.ts';
import { ReviewType } from '../../interfaces/ReviewProps.ts';
import Review from './Review.tsx';

type MonsterDetailsModalProps = {
  id: string;
  name: string;
  hit_points: number;
  type: string;
  image: string;
  onClose: () => void;
};

const MonsterDetailsModal = ({ id, name, hit_points, type, image, onClose }: MonsterDetailsModalProps) => {
  const { userId } = useContext(AuthContext);

  const { data, error } = useQuery(GET_MONSTER_REVIEWS, {
    variables: { monsterId: id },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: false,
  });

  const reviews: ReviewType[] = data?.monster?.reviews || [];

  const sortedReviews = [...reviews].sort((a, b) => (a.user.id === userId ? -1 : b.user.id === userId ? 1 : 0));

  if (error) return <p>Error loading reviews.</p>;

  const calculateAverageDifficulty = () => {
    if (reviews.length === 0) return 'No reviews';
    const totalDifficulty = reviews.reduce((sum: number, review: ReviewType) => sum + review.difficulty, 0);
    return (totalDifficulty / reviews.length).toFixed(1);
  };

  const averageDifficulty = calculateAverageDifficulty();

  return (
    <Dialog
      open={true}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100vw', sm: '95vw', md: '90vw', lg: '80vw', xl: '70vw' },
          height: { xs: '100vh', sm: '85vh', md: '85vh', lg: '85vh', xl: '85vh' },
          maxWidth: 'none',
          backgroundColor: 'black',
          padding: 2,
        },
      }}
    >
      <DialogContent className="flex flex-col xl:flex-row bg-black gap-6 h-full overflow-x-hidden">
        {/* Monster Info Section */}
        <Box className="w-full xl:w-1/2 flex flex-col xl:items-center justify-center gap-2 flex-shrink-0">
          <img src={image} alt={name} className="w-full sm:w-3/4 xl:w-1/2 rounded" />
          <h2 className="header">{name}</h2>

          <div className="flex flex-col gap-2">
            <p className="text">Type: {type}</p>
            <p className="text">HP: {hit_points}</p>
            <p className="text">Average Difficulty: {averageDifficulty}</p>
          </div>
        </Box>

        {/* Scrollable Reviews Section */}
        <Box className="w-full xl:w-1/2 rounded h-full flex flex-col gap-3">
          <div className="sticky top-0 z-10 bg-black py-4">
            <h2 className="header xl:ml-[1.5vw]">Reviews</h2>
          </div>

          <div className="overflow-y-auto flex-1 flex flex-col gap-5 p-1">
            {sortedReviews.length > 0 ? (
              sortedReviews.map((review) => (
                <Review key={review.id} review={review} monsterId={id} monsterName={name} />
              ))
            ) : (
              <DialogContentText className="text">No reviews yet.</DialogContentText>
            )}
          </div>
        </Box>
      </DialogContent>

      <DialogActions className="bg-black">
        <Button
          onClick={onClose}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: '#DB3232',
              color: '#DB3232',
            },
            fontFamily: 'MedievalSharp',
            fontSize: '1.5rem',
          }}
          aria-label="Close modal"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(MonsterDetailsModal);
