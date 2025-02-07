import { useJobs } from '@public/nui/hook/job';
import { NuiEvent } from '@public/shared/event';
import { FunctionComponent } from 'react';

import { fetchNui } from '../../fetch';
import { usePlayer } from '../../hook/data';
import {
    MenuContent,
    MenuItemCheckbox,
    MenuItemSelect,
    MenuItemSelectOption,
    MenuTitle,
    SubMenu,
} from '../Styleguide/Menu';

export type JobSubMenuProps = {
    banner: string;
};

export const JobSubMenu: FunctionComponent<JobSubMenuProps> = ({ banner }) => {
    const player = usePlayer();
    const jobs = useJobs();

    if (!jobs || !player) {
        return null;
    }

    const currentJob = jobs.find(job => job.id === player.job.id);
    const grades = currentJob?.grades || [];

    return (
        <SubMenu id="job">
            <MenuTitle banner={banner}>Pour se construire un avenir</MenuTitle>
            <MenuContent>
                <MenuItemSelect
                    title="Changer de métier"
                    value={player.job.id}
                    onConfirm={async (index, jobId) => {
                        const job = jobs.find(job => job.id === jobId);

                        if (!job) {
                            return;
                        }

                        await fetchNui(NuiEvent.AdminSetJob, { jobId: job.id, jobGrade: job.grades[0]?.id || 0 });
                    }}
                >
                    {jobs.map(job => (
                        <MenuItemSelectOption value={job.id} key={'job_' + job.id}>
                            {job.label}
                        </MenuItemSelectOption>
                    ))}
                </MenuItemSelect>
                <MenuItemSelect
                    title="Changer de grade"
                    value={player.job.grade.toString()}
                    onConfirm={async (selectedIndex, grade) => {
                        await fetchNui(NuiEvent.AdminSetJob, { jobId: player.job.id, jobGrade: grade });
                    }}
                >
                    {grades.map(grade => (
                        <MenuItemSelectOption
                            value={grade.id.toString()}
                            key={'grade_' + player.job.id + '_' + grade.id}
                        >
                            {grade.name}
                        </MenuItemSelectOption>
                    ))}
                </MenuItemSelect>
                <MenuItemCheckbox
                    checked={player.job.onduty}
                    onChange={async value => {
                        await fetchNui(NuiEvent.AdminToggleDuty, value);
                    }}
                >
                    Passer en service
                </MenuItemCheckbox>
            </MenuContent>
        </SubMenu>
    );
};
