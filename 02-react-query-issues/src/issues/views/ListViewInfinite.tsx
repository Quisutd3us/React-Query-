import { useState } from 'react';

import { LoadingIcon } from '../../shared/components/LoadingIcon';

import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';

import { State } from '../interfaces';
import { useIssuesInfinity } from '../../hooks';


export const ListViewInfinite = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  // manage Open Closed issues 
  const [state, setState] = useState<State>();
  const {issuesQuery} = useIssuesInfinity({state:state,labels:selectedLabels});
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
            issues={issuesQuery.data?.pages.flat() || []}
            state={state}
            onStateChanged={(newState) => setState(newState)}
          />
        )}
        {/* Grid for Infinite Scroll Pagination */}
        <div className="row">
          <div className="col-12 mt-2 d-flex justify-content-left align-items-center">
            <button
              disabled={!issuesQuery.hasNextPage}
              className="btn btn-primary"
              onClick={() => issuesQuery.fetchNextPage()}
            >
              Load More +{" "}
            </button>
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
