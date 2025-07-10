import { useRecoilValue } from 'recoil';
import { qcManagerState } from '../../recoil/state/formState';
import FileSectionRenderer from '../atoms/FileSectionRenderer';



const ProjectQualityControlManager = () => {
  const qc_name = useRecoilValue(qcManagerState);
  const role = 'projectQualityControlManager';
  const string=`4. Project Quality Control Manager, Superintendent, & Site Safety and Health Officer\nINSERT RESUME & QUALIFICATIONS [${qc_name}]`
return(
  <div>
    <FileSectionRenderer initialHeading={string} role={role}/>
  </div>
)
};

export default ProjectQualityControlManager;
