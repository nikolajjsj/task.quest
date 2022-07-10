import { Project } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { rem, styled } from "../styles/stitches.config";
import { Card as AppCard } from "./common/common";

type Props = {
  project: Project;
};
export const ProjectCard = ({ project }: Props) => {
  const router = useRouter();
  const projectColor = project.color.length > 0 ? project.color : "#000";

  return (
    <Link href={`projects/${project.id}`}>
      <s.Card css={{ border: `2px solid ${projectColor}` }}>
        <s.Header>
          <s.Title>{project.title}</s.Title>

          {/* <s.HeaderActions>
          <Button size="sm" variant="delete" onClick={() => mutate(task.id)}>
            {isLoading ? <Spinner color="white" /> : <RiDeleteBinFill />}
          </Button>
        </s.HeaderActions> */}
        </s.Header>

        <s.Description>{project.description}</s.Description>
      </s.Card>
    </Link>
  );
};

namespace s {
  export const Card = styled(AppCard, {
    minHeight: rem(200),
    margin: "0 auto",
    cursor: "pointer",

    "&:hover": {
      background: "none rgba(0, 0, 0, 0.1)",
    },
  });

  export const Header = styled("header", {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  });

  export const Title = styled("h4", {
    fontSize: "$2xl",
    fontWeight: 600,
  });

  export const HeaderActions = styled("div", {
    display: "flex",
  });

  export const Description = styled("p", {
    margin: "$4 0",
  });
}
