// Loaded lazily by MotionProvider so animation feature code stays out of the initial bundle.
// domMax is used (rather than domAnimation) because the project slider needs drag.
import { domMax } from "motion/react";

export default domMax;
