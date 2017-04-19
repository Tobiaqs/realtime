import PersonalScreen from '../screen/Personal';
import ProjectScreen from '../screen/Project';
import NotFound from '../component/NotFound';
import { Project, ProjectStore } from '../store/Project';
import { Entry, EntryStore } from '../store/Entry';
import moment from 'moment';

export function home(store) {
    const projectStore = new ProjectStore();
    const entryStore = new EntryStore({ relations: ['project'] });
    store.setView({
        name: 'home',
        render: PersonalScreen,
        currentEntry: new Entry({ startedAt: moment() }, { relations: ['project'] }),
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

export function notFound(store) {
    store.setView({
        name: 'notFound',
        render: NotFound,
    });
}
