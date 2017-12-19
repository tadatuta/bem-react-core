import { decl } from 'bem-react-core';
import SimpleBlock from 'b:SimpleBlock';
import Stylable from 'b:Stylable';

export default decl([SimpleBlock, Stylable], {
    block : 'SimpleInheritedBlock',
    addBemClassName : true
});
