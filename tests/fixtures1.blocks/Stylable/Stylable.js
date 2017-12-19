import { decl } from 'bem-react-core';

export default decl({
    block : 'Stylable',

    addBemClassName : false,

    mods({ theme }) {
        return { theme };
    }
});
