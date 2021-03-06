import MyTimeScreen from './screen/MyTime';
import ProjectScreen from './screen/Project';
import UserScreen from './screen/User';
import NotFound from './component/NotFound';
import { Project, ProjectStore } from './store/Project';
import { UserStore } from './store/User';
import { Entry, EntryStore } from './store/Entry';
import moment from 'moment';

export function home(store) {
    const projectStore = new ProjectStore();
    const entryStore = new EntryStore();
    store.setView({
        name: 'home',
        render: MyTimeScreen,
        currentEntry: new Entry({ startedAt: moment() }),
        projectStore,
        entryStore,
    });
}

export function projects(store) {
    const projectStore = new ProjectStore();
    store.setView({
        name: 'home',
        render: ProjectScreen,
        currentProject: new Project(),
        projectStore,
    });
}

export function users(store) {
    const userStore = new UserStore();
    const entryStore = new EntryStore();
    const projectStore = new ProjectStore();
    store.setView({
        name: 'home',
        render: UserScreen,
        userStore,
        entryStore,
        projectStore,
    });
}

export function notFound(store) {
    store.setView({
        name: 'notFound',
        render: NotFound,
    });
}
