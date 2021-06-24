import {Component} from 'react'
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import './inPageNav.css';
import '../../shared/globalStyles/global.css';


interface InPageNavState{
}

interface InPageNavProps{
    navButtons: Array<Object>;
}

const NavButton = withStyles({
      containedPrimary: {
        color: "var(--theme-special-text)",
        backgroundColor: "var(--theme-special-background)",
        '&:hover': {
          backgroundColor: "var(--theme-special-background-alt)",
        },
      },
})(Button);


export default class InPageNav extends Component<InPageNavProps, InPageNavState>{
    navButtons: Array<Object>;

    constructor(props: InPageNavProps)
    {
        super(props);
        this.navButtons = props.navButtons
    }

    // TODO: Uses similar style as navbar. Potentially refactor that with the common code here.
    buildNavRender() : JSX.Element {
        return (
            <div className="in-page-nav-container">
                {this.navButtons.map((obj, idx) => {
                    if (Object(obj)["link"].startsWith("http")) {
                        return (
                            <a key={idx} target="_blank" rel="noopener noreferrer" href={Object(obj)["link"]}>
                                <NavButton variant="contained" startIcon={Object(obj)["startIcon"]} size="large" color="primary">
                                    {Object(obj)["buttonContent"]}
                                </NavButton>
                            </a>
                        );
                    } else {
                        return (
                            <NavLink key={idx} to={Object(obj)["link"]}>
                                <NavButton variant="contained" startIcon={Object(obj)["startIcon"]} size="large" color="primary">
                                    {Object(obj)["buttonContent"]}
                                </NavButton>
                            </NavLink>
                        );
                    }
                })}
            </div>
        );
    }

    render() {
        return this.buildNavRender();
    }

}
