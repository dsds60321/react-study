import EventsNavigation from "../components/EventsNavigation";
import { Outlet } from "react-router-dom";

function EventRootLayout() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}

export default EventRootLayout;
