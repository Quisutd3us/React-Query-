import { useState } from 'react';

import { LoadingIcon } from '../../shared/components/LoadingIcon';

import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { useIssues } from '../../hooks';
import { State } from '../interfaces';


export const ListViewInfinite = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  // manage Open Closed issues 
  const [state, setState] = useState<State>();
  const {issuesQuery,page,nextPage,previousPage} = useIssues({state:state,labels:selectedLabels});

  const onChangeLabels =(labelName:string)=>{
   
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
    };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesQuery.data || []}
            state={state}
            onStateChanged={(newState) => setState(newState)}
          />
        )}
        {/* Grif for Infinite Scroll Pagination */}
        <div className="row">
          <div className="col-12 mt-2 d-flex justify-content-left align-items-center">
            <button className='btn btn-primary'>Load More + </button>
          </div>
        </div>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onChangeLabels(labelName)}
        />
      </div>
    </div>
  );
}
