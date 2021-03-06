var keystone = require('keystone');
var Types    = keystone.Field.Types;

/**
 * Domain Model
 */

var Domain = new keystone.List('Domain', {
    autokey : { path:'slug', from:'name', unique:true },
    track : { createdAt:true, createdBy:true, updatedAt:true, updatedBy:true }
});


Domain.add({
    user            : { type: Types.Relationship, ref: 'User', index: true }, // Owner
    name            : { type: String, required: true, index: true },
    uri             : { type: Types.Url, index: true },
    location        : { type: Types.Location }, //supports multiple inputs
    language        : { type: String, default: 'en-US' }, // for more specific localization
    about           : { type: Types.Markdown, height: 100 },
    rating          : { type: Types.Number, default: 0 },
    image           : { type: Types.CloudinaryImage },
    domains         : { type: Types.Relationship, ref: 'Domain', many: true },
    socials         : { type: Types.Relationship, ref: 'Social', many: true },
    category        : { type: Types.Relationship, ref: 'DomainCategory', many: true },
    tags            : { type: String, default: '' },
    status          : { type: Types.Select, options: 'private, public', initial: true, default: 'public' }
});

//display
Domain.defaultColumns = 'name, user|20%, rating|20%, category|20%, language|20%';

//registration
Domain.register();
