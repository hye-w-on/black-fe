import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import { Grid } from "@mui/material";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

const ModalExample = () => {
  const data = [
    {
      id: 1,
      title: "List Item A",
      content: "Content A",
    },
    {
      id: 2,
      title: "List Item B",
      content: "Content B",
    },
    {
      id: 3,
      title: "List Item C",
      content: "Content C",
    },
    {
      id: 4,
      title: "List Item D",
      content: "Content D",
    },
    {
      id: 5,
      title: "List Item E",
      content: "Content E",
    },
    {
      id: 6,
      title: "List Item C",
      content: "Content C",
    },
    {
      id: 7,
      title: "List Item D",
      content: "Content D",
    },
    {
      id: 8,
      title: "List Item E",
      content: "Content E",
    },
    {
      id: 9,
      title: "List Item C",
      content: "Content C",
    },
    {
      id: 10,
      title: "List Item D",
      content: "Content D",
    },
    {
      id: 11,
      title: "List Item E",
      content: "Content E",
    },
  ];
  const [rerender, setRerender] = useState(true);

  const handleRerender = () => {
    setRerender(!rerender);
  };
  const [cardIndex, setCardIndex] = useState<number | null>();

  const handleClose = useCallback(() => {
    setCardIndex(null);
  }, []);

  return (
    <>
      <div
        style={{
          background: "#EEEEEE",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/*<Panel onChange={handleChange} />*/}
        <br />
        <br />
        <br />
        <StyledButton onClick={handleRerender}>Rerender</StyledButton>
        <br />
        {rerender && (
          <LayoutGroup>
            <Grid
              container
              spacing={3}
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
              {data.map((data, index) => (
                <Grid key={index} item xs={6} style={{ padding: "0 0 0 0" }}>
                  <motion.div
                    key={data.id}
                    layoutId={`${data.id}`}
                    onClick={() => cardIndex === null && setCardIndex(data.id)}
                  >
                    <StyledCard key={index}>
                      <motion.div layoutId={`contents-${cardIndex}`}>
                        <StyledCardTitle>{data.title}</StyledCardTitle>
                        <StyledCardContents>{data.content}</StyledCardContents>
                      </motion.div>
                    </StyledCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
            <AnimatePresence>
              {cardIndex !== null && (
                <>
                  <motion.div
                    key="modal"
                    style={{
                      position: "fixed",
                      top: "20%",
                      left: "20%",
                      width: "40%",
                      height: "40%",
                      zIndex: 99,
                    }}
                  >
                    <motion.div
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        width: "100%",
                        height: "100%",
                      }}
                      onClick={handleClose}
                      layoutId={`${cardIndex}`}
                    >
                      <StyledCardTitle>List Item A</StyledCardTitle>
                    </motion.div>
                  </motion.div>
                  <motion.div
                    key="backdrop"
                    onClick={handleClose}
                    variants={{
                      hidden: {
                        opacity: 0,
                        transition: {
                          duration: 0.16,
                        },
                      },
                      visible: {
                        opacity: 0.5,
                        transition: {
                          delay: 0.04,
                          duration: 0.2,
                        },
                      },
                    }}
                    style={{
                      backgroundColor: "#444",
                      width: "100%",
                      height: "100%",
                      position: "fixed",
                      zIndex: 1,
                    }}
                    initial="hidden"
                    exit="hidden"
                    animate="visible"
                  />
                </>
              )}
            </AnimatePresence>
          </LayoutGroup>
        )}
        <br />
      </div>
    </>
  );
};

export default ModalExample;

const StyledButton = styled("button")`
  color: #fff;
  background: #070f2b;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
`;

const StyledCardTitle = styled("div")`
  color: #1c1c1c;
  font-size: 1.2rem;
  font-weight: 800;
`;
const StyledCardContents = styled("div")`
  color: #424242;
  font-size: 0.7rem;
  font-weight: 400;
`;
const StyledCard = styled("div")`
  display: flex;
  flex-direction: column;
  color: #000;
  background: #fff;
  margin: 5px;
  padding: 20px 30px 20px 30px;
  border-radius: 10px;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.04), 0 4px 2px rgba(0, 0, 0, 0.04),
    0 8px 4px rgba(0, 0, 0, 0.04), 0 16px 8px rgba(0, 0, 0, 0.04),
    0 32px 16px rgba(0, 0, 0, 0.04);
`;
