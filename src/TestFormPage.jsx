import React, { useState } from 'react';
import { EditForm, EditEntryType } from './EditForm';

export default function TestFormPage() {
    const [entityObj, setEntityObj] = useState({ tags: ['React', 'Firebase'] });

    return (
        <div className="p-8">
            <EditForm
                title="Test PillList Form"
                description="Try adding/removing tags below."
                entityObj={entityObj}
                editEntries={[
                    {
                        attribute: 'tags',
                        attributeName: 'Tags',
                        type: EditEntryType.PillList,
                        isRequired: false,
                    },
                ]}
                onSubmitSuccess={(updatedEntity) => {
                    console.log('Submitted entity:', updatedEntity);
                    setEntityObj(updatedEntity);
                }}
            />
        </div>
    );
}