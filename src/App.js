import React, { Component } from 'react';
import classNames from 'classnames';
import { AppTopbar } from './AppTopbar';
// import {AppFooter} from './AppFooter';
import { AppMenu } from './AppMenu';
// import {AppProfile} from './AppProfile';
import { Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import PaperRequest from "./components/PaperRequest";
import WaterRequest from "./components/WaterRequest";
import MilkRequest from "./components/MilkRequest";
import _ItemsList from "./components/ProductsList";
import Advertisements from "./components/Advertisements";
import _FlatsActivation from "./components/FlatsDetails";
import { ChartsDemo } from './components/ChartsDemo';
import {getwaterRequests,getProductsList,getFlatsList,getadvancedRequests} from "./actions/action";
import { connect } from 'react-redux'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import 'primereact/resources/themes/nova-light/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './layout/layout.scss';
import './App.scss';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
class App extends Component {

    constructor() {
        super();
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false
        };

        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.createMenu();
    }
componentDidMount(){
this.props.dispatch(getwaterRequests());
this.props.dispatch(getProductsList());
this.props.dispatch(getFlatsList());
this.props.dispatch(getadvancedRequests());

}
    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            });
        }

        this.menuClick = false;
    }

    onToggleMenu(event) {
        this.menuClick = true;

        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                });
            }
            else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                });
            }
        }
        else {
            const mobileMenuActive = this.state.mobileMenuActive;
            this.setState({
                mobileMenuActive: !mobileMenuActive
            });
        }

        event.preventDefault();
    }

    onSidebarClick(event) {
        this.menuClick = true;
    }

    onMenuItemClick(event) {
        if (!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }
    }

    createMenu() {
        this.menu = [
            {
                label: 'Dashboard', icon: 'pi pi-fw pi-home', to:'/'
            },
            {
                label: 'Advertisements', icon: 'pi pi-video', to:'/Advertisements'
            },
            {
                label: 'Bill Status', icon: 'pi pi-briefcase', to:'/BillStatus'
            },
            {
                label: 'Day Wise Items', icon: 'pi pi-info-circle', to:'/DayWiseItems'
            },
            
            {
                label: 'Flats Activation', icon: 'pi pi-unlock', to:'/FlatsActivation'
            },
            {
                label: 'Flat Wise Bill', icon: 'pi pi-money-bill', to:'/FlatWiseBill'
            },
            {
                label: 'Menu Colors', icon: 'pi pi-fw pi-align-left',
                items: [
                    { label: 'Dark', icon: 'pi pi-fw pi-bars', command: () => this.setState({ layoutColorMode: 'dark' }) },
                    { label: 'Light', icon: 'pi pi-fw pi-bars', command: () => this.setState({ layoutColorMode: 'light' }) }
                ]
            },
            {
                label: 'Items List', icon: 'pi pi-list', to:'/ItemsList'
            },
            
            {
                label: 'Item Requests', icon: 'pi  pi-shopping-cart', badge: '9',
                items: [
                    { label: 'PaperRequest', icon: 'pi  pi-shopping-cart', to: '/PaperRequest' },
                    { label: 'WaterRequest', icon: 'pi  pi-shopping-cart', to: '/WaterRequest' },
                    { label: 'MilkRequest', icon: 'pi  pi-shopping-cart', to: '/MilkRequest' },

                ]
            },
            {
                label: 'Subscription Details', icon: 'pi pi-tags', to:'/SubscriptionDetails'
            },

        ];
    }

    addClass(element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    removeClass(element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    componentDidUpdate() {
        if (this.state.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    }

    render() {
        const logo = this.state.layoutColorMode === 'dark' ? 'assets/layout/images/logo.png' : 'assets/layout/images/logo.png';

        const wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        });

        const sidebarClassName = classNames("layout-sidebar", {
            'layout-sidebar-dark': this.state.layoutColorMode === 'dark',
            'layout-sidebar-light': this.state.layoutColorMode === 'light'
        });

        return (
            <div className={wrapperClass} onClick={this.onWrapperClick}>
                <AppTopbar onToggleMenu={this.onToggleMenu} />

                <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>
                    <div className="title-main">Sri Srinivasa Traders</div>
                    {/* <AppProfile /> */}
                    <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
                </div>

                <div className="layout-main">
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/Advertisements" component={Advertisements} />

                    <Route path="/ItemsList" component={_ItemsList} />

                    <Route path="/WaterRequest" component={WaterRequest} />
                    <Route path="/PaperRequest" component={PaperRequest} />
                    <Route path="/MilkRequest" component={MilkRequest} />
                    <Route path="/FlatsActivation" component={_FlatsActivation} />



                </div>
                <ToastContainer className="toastClass" autoClose={3000} />

                {/* <AppFooter /> */}

                <div className="layout-mask"></div>
            </div>
        );
    }
}

export default connect(null)(App);
